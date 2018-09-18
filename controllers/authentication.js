const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config')

function userToken(user) {
    const timestamp = new Date ().getTime();
    return jwt.sign({ sub: user.id, iat: timestamp }, JWT_SECRET );
}

exports.signin = function(req, res) {

    // User has had their email and pw authorized, we just need to give them a token

    res.json({ token: userToken(req.user) });
}

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exists

    User.findOne({email: email}, function (err, existingUser) { //using callback instead of promise
        console.log(err, existingUser);
        if (err) {
            return next(err);
        }

        // If email does exist, return an error

        if (existingUser) {
            return res.status(422)
                .send({ error: 'Email already registered' });
        }

        // If email does not exist, create and save user record

        const newUser = new User({
            email: email,
            password: password
        });

        // save record to database

        newUser.save(function (err) {
            if (err) {
                return next(err);
            }

            // respond to request indicating the user was created

            res.json({ token: userToken(newUser) });
        });
    });
}

