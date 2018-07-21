const User = require("../models/User");


module.exports = {
  googleAuth: (token, profile, done) => {

    User.findOne({
      'googleid': profile.id
    })
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          const newUser = new User({
            googleid: profile.id,
            googletoken: token,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
          }).save().then(newUser => done(null, newUser))
        }
      })
    }
  };