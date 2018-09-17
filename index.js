// Main starting point of our application and will be first thing to execute when the server starts

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); // create an instance of Express - the instance is our app.
const router = require('./router');

const mongoose = require('mongoose');
require('./services/passport');
require('./models/student');
require('./models/user');
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

// App setup to get Express working
// Morgan and bodyParser are Express middleware (any incoming request will be passed into them by default)

app.use(morgan('combined')); // Logging framework for logging incoming requests
app.use(cors()); // Will make our Express app accept requests from any domain/subdomain/port
app.use(bodyParser.json( { type: '*/*' })); // Parses incoming requests into json
router(app);
// Create a static webserver

app.use(express.static(path.join(__dirname, '.././client/build'))); // production build creates /build directory and we need to tell Express to use it
router(app);

// Server setup to get Express app to talk to the outside world

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT);

console.log('Server listening on:', PORT);

module.exports = app;

// Next: set up server to handle routes and respond with json data - i.e. add route handlers to Express app in router.js

