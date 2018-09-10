const Authentication = require('./controllers/authentication');


module.exports = function(app) { // Inside this function we have access to our Express app
    app.post('/signup', Authentication.signup); // Define a route that the user can visit

}
