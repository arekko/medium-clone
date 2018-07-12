const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const gravatar = require('gravatar')

const validateRegisterInput = require('../validation/registration')

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// the callback after google has authenticated the user
router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/"
  })
);

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

router.get("/auth/logout", function(req, res) {
  req.logout();
  res.redirect('http://localhost:3000/');
});


router.post(
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





module.exports = router;
