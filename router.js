const Authentication = require('./controllers/authentication');
const passport = require('passport');
// const path = require('path');

// Create an object and insert it between our incoming request and our route handler (i.e. Passport middleware - requireAuth)

const requireAuth = passport.authenticate('jwt', { session: false }); // When a user is authenticated don't try to create a session for them (by default, Passport tries to make a cookie-based session for the request)

const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) { // Inside this function we have access to our Express app
    app.get('/', requireAuth, function(req, res) {
        res.send('GET request to homepage');
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(dirname+'../.client/build/index.html'));
    // });

    app.get('/students', requireAuth, function(req, res) {

    })


}
