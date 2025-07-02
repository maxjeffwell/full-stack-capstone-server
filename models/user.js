// Local definition of exactly what a user is so we can tell Mongoose what a model is and how it should handle that for us

import mongoose from 'mongoose';
const { Schema } = mongoose; // Schema is what we use to tell Mongoose about the particular fields our model is going to have

import bcrypt from 'bcryptjs';

// Define our model

const userSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// On Save Hook, encrypt password
// before saving model, run this function

userSchema.pre('save', function (next) {
    const user = this; // get access to user model; user is an instance of the user model at this point

    // generate a salt (takes time, so then run callback)

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        // hash password using the salt

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            // overwrite plain text password with encrypted password

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
           return callback(err);
        } callback(null, isMatch);
    });
};

// Create the model class (what we're going to use to create new users) - represents all users, not just a particular user

const User = mongoose.models.user || mongoose.model('user', userSchema);

// Loads schema into Mongoose and tells it there's a new schema and that it's about a user and it
// corresponds to a collection named 'user'

export default User;



