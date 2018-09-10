// Local definition of exactly what a user is so we can tell Mongoose what a model is and how it should handle that for us

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema is what we use to tell Mongoose about the particular fields our model is going to have

// Define our model

const userSchema = new Schema ({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

// Create the model class (what we're going to use to create new users) - represents all users, not just a particular user

const ModelClass = mongoose.model('user', userSchema); // Loads schema into Mongoose and tells it there's a new schema and that it's about a user and it corresponds to a collection named 'user'


// Export the model so other files in application can make use of it

module.exports = ModelClass;


