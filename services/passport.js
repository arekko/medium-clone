const passport = require("passport");
const User = require("../models/User");
const configAuth = require("../config/auth");
const GoogleStrategy = require("passport-google-oauth20");
var LocalStrategy = require("passport-local").Strategy;


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      //options for the strategy
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
      passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    (req, token, refreshToken, profile, done) => {

      User.findOne({ 'googleid': profile.id })
        .then(user => {
          if(user) {
            return done(null, user)
          } else {
            const newUser = new User({
              googleid: profile.id,
              googletoken: token,
              firstname: profile._json.givenName,
              lastname: profile._json.familyName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value
            }).save().then(newUser => done(null, newUser))
          }
        })


    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ "local.email": email }, (err, user) => {
        // if there are any errors, return the error
        if (err) return done(err);
        // check to see if theres already a user with that email
        if (user) {
          return done(
            null,
            false,
            req.flash("signupMessage", "That email is already taken.")
          );
        } else {
          if (!req.user) {
            // if there is no user with that email
            // create the user
            let newUser = new User();
            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save().then(newUser => done(null, newUser));
          } else {
            let user = req.user;

            user.local.email = email;
            user.local.password = user.generateHash(password);
            console.log(user.local.passport);

            user.save().then(user => done(null, user));
          }
        }
      });
    }
  )
);