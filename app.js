const express = require('express');
// const authRoutes = require('./routes/authRoutes')
const articleRoutes = require('./routes/articlesRoutes')
const mongoose = require('mongoose');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require('passport')
var flash = require("connect-flash");
const sessionSecret = require('./config/auth').sessionSecret
const cloudinary = require('cloudinary');
const cloudinaryKeys = require('./config/cloudinary')
const articleroutes = require('./routes/articlesRoutes');


const app = express();


const db = require('./config/database').url
//Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log('Mongodb connected seccessfully'))
    .catch( err => console.log(err))

require('./services/passport')

// cloudinary connection
cloudinary.config({
  cloud_name: cloudinaryKeys.cloud_name,
  api_key: cloudinaryKeys.api_key,
  api_secret: cloudinaryKeys.api_secret
});

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
require('./routes/authRoutes')(app)
// Article routes
app.use('/api', articleroutes);


if (process.env.NODE_ENV == 'production') {
  // Express will serve up produciton assets like main.js file
  app.use(express.static('client/build'))

  // Express will serve up the index.js file if it doesnt recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}




const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app listen port ${PORT}`)
})
