import jwt from 'jsonwebtoken';
import User from '../models/user';

function userToken(user) {
    const timestamp = new Date ().getTime();
    return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET );
}

export const Signin = function(req, res) {

    // User has had their email and password authorized, give them a token

    res.json({ token: userToken(req.user) });
};

export const Signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide an email and password' });
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
};


