const Authentication = require('./controllers/authentication');
// const passportConfig = require('./services/passport');
const passport = require('passport');

// Create an object and insert it between our incoming request and our route handler (i.e. Passport middleware - requireAuth)

// const requireAuth = passport.authenticate('jwt', { session: false }); // When a user is authenticated don't try to make a session for them (by default, Passport tries to make a cookie-based session for the request, but we're using tokens and we don't want that)

module.exports = function(app) { // Inside this function we have access to our Express app
    app.post('/signup', Authentication.signup); // Define a route that the user can visit

}
