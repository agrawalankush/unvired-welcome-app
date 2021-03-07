const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const passport = require('passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./backend/config/database');

// load the models
require('./backend/models/user');
require('./backend/models/audit');

// Pass the global passport object into the configuration function
 require('./backend/config/passport')(passport);



// For adding security headers
app.use(helmet());

// initialize the passport object on every request
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// For Angular application to make HTTP requests to Express application
app.use(cors());

// When run `ng build`, the output will go to the ./dist directory
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/unvired')));


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./backend/routes'));


// Send all other requests to the Angular app
app.get('*', (req, res) => {
  // res.contentType('text/javascript');
  res.sendFile(path.join(__dirname, 'dist/unvired/index.html'));
});

/**
 * -------------- SERVER ----------------
 */


//Set Port
const port = process.env.PORT || '3000';
// process.env.NODE_ENV = 'production';
app.set('port', port);

// Server listens on http://localhost:3000
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
