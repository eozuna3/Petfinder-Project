/* eslint-disable indent */
var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Load index page

  app.get("/", function (req, res) {
    db.Customer.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/petRecord/:id", function (req, res) {
    axios({
      headers: {
        Authorization: "Bearer " + process.env.PETFINDER_ACCESS_TOKEN
        // Authorization: "Bearer " + globalPetFinderToken
      },
      method: "GET",
      url: `https://api.petfinder.com/v2/animals/${req.params.id}`,
      params: req.params
    })
      .then(function (searchPetsResponse) {
        // console.log(searchPetsResponse);
        var petsFoundObject = {
          petsFound: searchPetsResponse.data.animals
        };
        // res.render("index", JSON.parse(JSON.stringify(petsFoundObject)));
        //JSON.parse(JSON.stringify(petsFoundObject))
        res.json(petsFoundObject).end();
      })
      .catch(function (error) {
        console.log("errorToken: \n", error.response);
      });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/search", function(req, res) {
    res.render("search");
  });

  app.get("/homepage", function(req, res) {
    /* Select all on from database
        put it inside handlebar object
        place handlebar object as second arguement
    */
    res.render("homepage");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
