const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');


function userToken(user) {
    const timestamp = new Date ().getTime();
    return jwt.sign({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {

    // User has had their email and pw authorized, we just need to give them a token

    res.send({ token: userToken(req.user) });
}

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exists

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }

        // If a user with email does exist, return an error

        if (existingUser) {
            return res.status(422)
                .send({ error: 'Email is in use'});
        }

        // If a user with email does not exist, create and save user record

        const user = new User({
            email: email,
            password: password
        });

        // save record to the database

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            // respond to request indicating the user was created

            res.json({ token: userToken(user) });
        });
    });
}
