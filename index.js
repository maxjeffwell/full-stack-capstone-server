import 'dotenv/config.js';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const app = express();
import { Router } from './router.js';

import mongoose from 'mongoose';
import './services/passport.js';
import './models/student.js';
import './models/user.js';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/local', {
    useNewUrlParser: true
});


// App setup to get Express working
// Morgan and bodyParser are Express middleware (any incoming request will be passed into them by default)

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/signin', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.'
}));
app.use('/signup', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Too many registration attempts, please try again later.'
}));
app.use(limiter);

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

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

