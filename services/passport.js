// Configuration to help set up Passport (Passport will help us to authenticate a user when they attempt to access a route requiring authentication)

// Answer question "is our user logged in?" before they hit the authentication controller

const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy; // method for authenticating a user (this strategy validates a user with a JWT)

const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Strategy

const jwtOptions = { // have to tell JWT strategy where to look on request in order to find this key or secret
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

    // When we get the payload back it is going to be the user Id and timestamp that was encoded when we created userToken (will   have subject property and issuedAt property)
    // done is a callback function we call when we're able to successfully authenticate the user
    // See if the user ID in the payload exists in the database. If it does, call 'done'. Otherwise, call 'done' without a user object
    User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false); // search failed to occur
        } if (user) {
            done(null, user); // search occurred and found a user
        } else {
            done(null, false); // search occurred but we couldn't find a user (person is not authenticated)
        }
    });
});


// Tell Passport to use the Strategy

passport.use(jwtLogin);






