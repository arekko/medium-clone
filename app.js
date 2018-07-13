const express = require('express');
const authRoutes = require('./routes/authRoutes')
const articleRoutes = require('./routes/articlesRoutes')
const mongoose = require('mongoose');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require('passport')
var flash = require("connect-flash");
const sessionSecret = require('./config/auth').sessionSecret

const app = express();


const db = require('./config/database').url
//Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log('Mongodb connected seccessfully'))
    .catch( err => console.log(err))

require('./services/passport')

//Middleware
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({extended: false}));


// required for passport
app.use(session({ secret: sessionSecret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// Routes
app.use('/', authRoutes);
app.use('/api', articleRoutes);



const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app listen port ${PORT}`)
})
