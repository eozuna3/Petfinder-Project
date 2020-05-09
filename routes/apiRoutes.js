/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */

require("dotenv").config();
var db = require("../models");
var axios = require("axios");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.ChosenPet.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a newly chosen pet
  app.post("/api/choosePet", function (req, res) {
    console.log("req.body", req.body);
    db.ChosenPet.create({
      petId: req.body.petId,
      customerId: req.body.customerId
    }).then(function (dbChosenPets) {
      res.json(dbChosenPets);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });


  // PETFINDER Load Pet Types page and pass in an example
  // need Petsaver client_id and client_secret to request token, then request types, returns petTypes object.
  app.get("/api/loadPetTypes", function (req, res) {
    var credentialString =
      '{"grant_type":"client_credentials","client_id":"' +
      process.env.PETFINDER_CLIENT_ID +
      '","client_secret":"' +
      process.env.PETFINDER_CLIENT_SECRET +
      '"}';
    axios({
      headers: {
        "Content-Type": "application/json",
      },
      data: credentialString,
      method: "POST",
      url: "https://api.petfinder.com/v2/oauth2/token"
    })
      .then(function (petFinderTokenResponse) {
        process.env.PETFINDER_ACCESS_TOKEN = petFinderTokenResponse.data.access_token;

        axios({
          headers: {
            Authorization: "Bearer " + process.env.PETFINDER_ACCESS_TOKEN
          },
          method: "GET",
          url: "https://api.petfinder.com/v2/types"
        })
          .then(function (typeObject) {
            // for (var i = 0; i < typeObject.data.types.length; i++) {
            //   console.log(typeObject.data.types[i]);
            // }
            var petTypeObject = {
              petType: typeObject.data.types
            };
            // res.render("search", petTypeObject).end();  // only to use if go back to search.handlebars
            res
              .header("Authentication", process.env.PETFINDER_ACCESS_TOKEN)  //send back token as well
              .json(petTypeObject)
              .end();
          })
          .catch(function (errorType) {
            console.log("errorType:\n", errorType);
          });
      })
      .catch(function (errorToken) {
        if (errorToken.response) {
          console.log("errorToken: \n", errorToken);
        }
      });
  });


  // get matching pets
  app.get("/api/searchPets", function (req, res) {
    // console.log("searchPets route found");
    // console.log("process.env.PetToken: ", process.env.PETFINDER_ACCESS_TOKEN);
    console.log("params", req.query);

    axios({
      headers: {
        Authorization: "Bearer " + process.env.PETFINDER_ACCESS_TOKEN
        // Authorization: "Bearer " + globalPetFinderToken
      },
      method: "GET",
      url: "https://api.petfinder.com/v2/animals",
      params: req.query
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
};
