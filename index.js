import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';

const app = express();
import { Router } from './router';

import mongoose from 'mongoose';
import './services/passport';
import './models/student';
import './models/user';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/local', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

// App setup to get Express working
// Morgan and bodyParser are Express middleware (any incoming request will be passed into them by default)

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(cors());

Router(app);

// Create a static server

// production build creates /build directory and we need to tell Express to use it

// Server setup to get Express app to talk to the outside world

if (process.env.NODE_ENV === 'production') {

    // Express will serve up production assets

    app.use(express.static('client/build'));

    // Express will serve up the index.html file if it doesn't recognize the route

  app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT);

console.log('Server listening on:', PORT);

// Next: add route handlers to Express app in router.js and configure to serve JSON

