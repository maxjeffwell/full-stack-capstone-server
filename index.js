// This is our index.js file. It is the main starting point of our application and will be the first thing to execute when the server starts (i.e. server initialization).

// require statements are how we're going to be doing code sharing between files

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); // we're creating an instance of Express - the instance is our app.
const router = require('./router');
const mongoose = require('mongoose');

// DB setup

mongoose.connect('mongodb://localhost:27017/local', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

// App setup to get Express working the way we want it to

// Morgan and bodyParser are Express middleware (any incoming request will be passed into them by default)

app.use(morgan('combined')); // Logging framework for logging incoming requests
app.use(bodyParser.json({type: '*/*'})); // Parses incoming requests into json (no matter what the request type is)
router(app);

// Server setup to get our Express app to talk to the outside world

const port = process.env.PORT || 8080; // If there is an environment variable of PORT already defined, we'll use it. If not, we'll use 8080
const server = http.createServer(app); // http library is a native node library that says create an http server that knows how to receive requests and anything that comes in should be forwarded to our Express app.
server.listen(port);

console.log('Server listening on:', port);

// Next: set up server to handle routes and respond with json data - i.e. add route handlers to Express app in router.js

