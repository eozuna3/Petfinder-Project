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

  // Create a new customer
  app.post("/api/signup", function (req, res) {
    console.log("req.body", req.body);
    db.Customer.create({
      customerId: req.body.customerId     // need to add other keys to this object
    }).then(function (dbSignup) {
      res.json(dbSignup);
    });
  });

  // Create a newly chosen pet
  app.post("/api/login", function (req, res) {
    console.log("req.body", req.body);
    db.Customer.findOne({
      customerId: req.body.customerId     // need to add other keys to this object
    }).then(function (dbLogin) {
      res.json(dbLogin);
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
        console.log(process.env.PETFINDER_ACCESS_TOKEN);
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


  // get matching pets from petFinder, called from indexApiCalls.js API.searchPets
  app.get("/api/searchPets", function (req, res) {
    console.log("params", req.query);
    var queryString = `?type=${req.query.type}&coat=${req.query.coat}&size=${req.query.size}` +
      `&breed=${req.query.breed}&age=${req.query.age}&gender=${req.query.gender}`;
    console.log("queryString", queryString);
    axios({
      headers: {
        Authorization: "Bearer " + process.env.PETFINDER_ACCESS_TOKEN
        // Authorization: "Bearer " + globalPetFinderToken
      },
      method: "GET",
      url: "https://api.petfinder.com/v2/animals" + queryString,
      // params: req.query
    })
      .then(function (searchPetsResponse) {
        // console.log(searchPetsResponse);
        /*var petsFoundObject = {
          petsFound: searchPetsResponse.data.animals
        };
        var petsFoundArray = searchPetsResponse.data.animals;
        console.log("\n---------------------\n");
        console.log("!!!THIS IS THE JSON RETURNED AFTER PETFINDER API CALL:\n");
       
        //  ADDED BY EO
        // Code that populates the chosenpets database for testing this for loop can then be used later in the index.js to populate caro
        for (let index = 0; index < 5; index++) {
          console.log(petsFoundArray[index].id);
          console.log(petsFoundArray[index].name);
          console.log(petsFoundArray[index].url);
          console.log(petsFoundArray[index].description);
          db.ChosenPet.create({
            petId: petsFoundArray[index].id,
            customerId: 6,
            petName: petsFoundArray[index].name,
            url: petsFoundArray[index].url,
            description: petsFoundArray[index].description
          });
          console.log("\n---------------------\n");
        }*/
        res.json(petsFoundObject).end();
      })
      .catch(function (error) {
        console.log("errorToken: \n", error.response);
      });
  });

// Create a 'Sign Up' page
app.post("/api/signup", function (req, res) {
  console.log("req.body", req.body);
  db.Customer.create({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userZip: req.body.userZip,
        userPassword: req.body.userPassword
  }).then(function (dbCustomers) {
    res.json(dbCustomers);
  });
});


//'Login' page
app.post("/api/login", function (req, res) {
  console.log("req.body", req.body);
  db.Customer.findAll({
    where: {
        userName: req.body.userName,
        userPassword: req.body.userPassword
    }
  }).then(function (dbCustomers) {
    res.json(dbCustomers);
  });
});

//  Delete a chosen pet from the database
app.delete("/api/deletePet/:id", function(req, res) {
    db.ChosenPet.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbChosenPets) {
        console.log("ChosenPet successfully deleted from database");
        res.json(dbChosenPets);
      })
  });
};



