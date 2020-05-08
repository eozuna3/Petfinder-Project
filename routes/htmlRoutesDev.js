var db = require("../models");

module.exports = function(app) {
     //  Load Login Page
     app.get("/", function(req, res) {
          res.render("login");
  });

  app.get("/signup", function(req, res) {
          res.render("signUp");
  });

  app.get("/search", function(req, res) {
     res.render("search");
});

     // Render 404 page for any unmatched routes
     app.get("*", function(req, res) {
          res.render("404");
     });

};
