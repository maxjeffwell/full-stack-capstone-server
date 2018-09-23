// Main starting point of application and first thing to execute when server starts

const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); // create an instance of Express - the instance is the app.
const router = require('./router');
const { PORT, CLIENT_ORIGIN } = require('./config');

const mongoose = require('mongoose');
require('./services/passport');
require('./models/student');
require('./models/user');
const dotenv = require('dotenv');


// load values from the .env file in this directory into process.env

dotenv.load();

// DB setup

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/local', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

// App setup to get Express working
// Morgan and bodyParser are Express middleware (any incoming request will be passed into them by default)

app.use(morgan('combined')); // Logging framework for logging incoming requests
app.use(bodyParser.json()); // Parses incoming requests into json

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

router(app);

// Create a static server

// production build creates /build directory and we need to tell Express to use it

// Server setup to get Express app to talk to the outside world

if (process.env.NODE_ENV === 'production') {

    // Express will serve up production assets

    app.use(express.static('client/build'));


    // Express will serve up the index.html file if it doesn't recognize the route

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const server = http.createServer(app);

server.listen(PORT);

console.log('Server listening on:', PORT);

// Next: add route handlers to Express app in router.js and configure to serve JSON

