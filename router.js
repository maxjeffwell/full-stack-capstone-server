const Authentication = require('./controllers/authentication');
// const passportConfig = require('./services/passport');
const passport = require('passport');
const path = require('path');

// Create an object and insert it between our incoming request and our route handler (i.e. Passport middleware - requireAuth)

const requireAuth = passport.authenticate('jwt', { session: false }); // When a user is authenticated don't try to create a session for them (by default, Passport tries to make a cookie-based session for the request, but we're using tokens and we don't want that)

const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) { // Inside this function we have access to our Express app
    app.get('/', requireAuth, function(req, res) {
        res.json({ Hey: 'You' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'./client/build/index.html'));
    });
}
