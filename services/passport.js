// Using Passport to authenticate a user when they attempt to access a route requiring authentication

// Answer question "is our user logged in?" before they hit the authentication controller
import passport from 'passport';
import User from'../models/user';

// import JwtStrategy from'passport-jwt'; // this strategy validates a user with a JWT

import { ExtractJwt, Strategy } from 'passport-jwt';
import LocalStrategy from 'passport-local';

// Create local strategy

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

    // Verify username and password, call done with the user if it is the correct username and password
    // otherwise call done with false

    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        // compare passwords - is `password` === user.password ?
        // have to compare a plaintext password with an encrypted password

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    });
});

// Set up options for JWT Strategy

const jwtOptions = { // have to tell JWT strategy where to look on request in order to find this key or secret
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env.JWT_SECRET,
};

// Create JWT Strategy

const jwtLogin = new Strategy(jwtOptions, function(payload, done) {

    // When we get the payload back it is going to be the user Id and timestamp that was encoded when we created userToken (will   have subject property and issuedAt property)

    // done is a callback function we call when we're able to successfully authenticate the user

    // See if the user ID in the payload exists in the database. If it does, call 'done'. Otherwise, call 'done' without a user object

    console.log(payload);


    User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false); // search failed to occur
        }if (user) {
            delete user.password;
             console.log(user);
            //
            done(null, user); // search occurred and found a user

        } else {
            done(null, false); // search occurred but we couldn't find a user (person is not authenticated)
        }
    });
});

// Tell Passport to use the Strategy

passport.use(jwtLogin);
passport.use(localLogin);








