/* eslint-disable indent */
// Get references to page elements

var $petFoundList = $("#petFound-list");

// *** Added by SB for Friendly Neighborhood Pet Finder
var petTypesObject;     //global object with petfinder type object for search
var $loadPetTypesBtn = $("#loadPetTypes");    // button to load type object from petfinder
var $searchPetsBtn = $("#searchPets");
var $loginBtn = $("#login");

// The API object contains methods for each kind of request we'll make
var API = {
  loadPetTypes: function () {
    return $.ajax({
      type: "GET",
      url: "api/loadPetTypes/"
    })
      .then(function (petTypes) {
        console.log("petTypes: ", petTypes);
        petTypesObject = petTypes;
      })
      .catch(function (err) {
        console.log("error getting types from PetFinder: ", err);
      });
  },
  searchPets: function () {
    var params = "?type=dog&size=small&coat=long&location=texas";  //currently not used
    var query = { type: "dog", size: "small", coat: "long", location: "texas" };
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "GET",
      url: "api/searchPets",
      data: JSON.stringify(query)
    })
      .then(function (petsFound) {
        // console.log("petTypes: ", petsFound);
        petsFoundObject = petsFound;    // assign response object to global
        // console.log(petsFoundObject);
        // location.reload();
      })
      .catch(function (err) {
        console.log("error getting types from PetFinder: ", err);
      });
  },
  choosePet: function (petId, customerId) {
    var bodyObj = { "petId": petId, "customerId": customerId };
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/choosePet",
      data: JSON.stringify(bodyObj)
    });
  }
};


// ** ADDED BY SB
// displayPetsFound gets displays pets found in PetFinder and repopulates the list
// uses global petsFoundObject to populate table
var displayPetsFound = function () {
  var testArray = petsFoundObject.petsFound;
  console.log("testArray", testArray);
  var $pets = testArray.map(function (val) {
    var $a = $("<a target='_blank'>")
      .text(val.name)
      .attr("href", val.url);

    var $li = $("<li>")
      .attr({
        class: "list-group-item",
        "data-id": val.id
      })
      .append($a);

    var $button = $("<button>")
      .addClass("btn btn-danger float-right choose")
      .text("choose");

    $li.append($button);

    return $li;
  });

  $petFoundList.empty();
  $petFoundList.append($pets);
  // });
};



// ** ADDED BY SB
// handleLoadPetTypesBtnClick is called when loadPetTypes button is clicked
// variable petTypes is loaded with PetFinder types object
var handleLoadPetTypesBtnClick = function () {
  console.log("loadTypes");

  API.loadPetTypes().then(function () {
    // refreshExamples();
  });
};

// ** ADDED BY SB
// handleSearchPetsBtnClick is called when loadSearch button is clicked
// variable petsFound is loaded with PetFinder petsFound object
var handleSearchPetsBtnClick = function (event) {
  event.preventDefault();
  console.log("loadSearchPets");

  API.searchPets().then(function () {
    displayPetsFound();
    // refreshExamples();
  });
};

// ** ADDED BY SB
// handleChooseBtnClick is called when a pet's choose button is clicked
// Sends the petfinder unique ID and customer ID to be stored in chosenPetsDB
var handleChooseBtnClick = function () {
  var idToChoose = $(this)
    .parent()
    .attr("data-id");
  var customerId = 1;
  API.choosePet(idToChoose, customerId).then(function () {
    refreshExamples();
  });
};


//
// ** ADDED BY SB
// Added event listeners for Friendly Neighborhood Pet Finder
$loadPetTypesBtn.on("click", handleLoadPetTypesBtnClick);
$searchPetsBtn.on("click", handleSearchPetsBtnClick);
$petFoundList.on("click", ".choose", handleChooseBtnClick);
// $loginBtn.on("click", handleFormLogin);
