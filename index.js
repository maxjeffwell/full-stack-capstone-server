// Main starting point of our application and will be first thing to execute when the server starts (i.e. server initialization).

// require statements are how we're going to be doing code sharing between files

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); // we're creating an instance of Express - the instance is our app.
const router = require('./router');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path=require('path');

// load values from the .env file in this directory into process.env
dotenv.load();

// DB setup

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/local', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

// App setup to get Express working the way we want it to

// Morgan and bodyParser are Express middleware (any incoming request will be passed into them by default)

app.use(morgan('combined')); // Logging framework for logging incoming requests
app.use(cors()); // Will make our Express app accept requests from any domain/subdomain/port - the "just let it happen" approach
app.use(bodyParser.json()); // Parses incoming requests into json
// Create a static webserver
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './client/build'))); // production build creates /build directory and we need to tell Express to use it
router(app);

// Server setup to get our Express app to talk to the outside world

const PORT = process.env.PORT || 8080; // If there is an environment variable of PORT already defined, we'll use it. If not, we'll use 8080
const server = http.createServer(app); // http library is a native node library that says create an http server that knows how to receive requests and anything that comes in should be forwarded to our Express app.

server.listen(PORT);

console.log('Server listening on:', PORT);

module.exports = app // Export for testing

// Next: set up server to handle routes and respond with json data - i.e. add route handlers to Express app in router.js

