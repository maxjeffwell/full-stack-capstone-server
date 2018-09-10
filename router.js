// We're going to export a function from this file, import it into index.js, and then pass app into that function

module.exports = function(app) { // Inside this function we have access to our Express app
    app.get('/', function(req, res, next) { // Define a route that the user can visit
     res.send(['grades', 'age', 'status']);
    });
}
