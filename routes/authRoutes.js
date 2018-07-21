const express = require("express");
const router = express.Router();
const passport = require("passport");
// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  // the callback after google has authenticated the user
  app.get("/auth/google/callback", passport.authenticate("google", {
      successRedirect: "http://localhost:3000/",
      failureRedirect: "/"
    })
  );
  //
  // app.get("/api/current_user", (req, res) => {
  //   res.send(req.user);
  // });
  //
  app.get("/auth/logout", function(req, res) {
    req.logout();
    res.redirect('http://localhost:3000/');
  });
  
  
  app.post(
    "/auth/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    (req, res) => {
      res.send({err: req.flash("signupMessage")})
    }
  );
}






