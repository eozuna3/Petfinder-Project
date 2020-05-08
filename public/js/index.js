/* eslint-disable indent */
// Get references to page elements

// const e = require("express");

var $petFoundList = $("#petFound-list");

// *** Added by SB for Friendly Neighborhood Pet Finder
var petTypesObject; //global object with petfinder type object for search
var $loadPetTypesBtn = $("#loadPetTypes"); // button to load type object from petfinder
var $searchPetsBtn = $("#searchPets");
var $loginBtn = $("#login");

// The API object contains methods for each kind of request we'll make
var API = {
  loadPetTypes: function() {
    return $.ajax({
      type: "GET",
      url: "api/loadPetTypes/"
    })
      .then(function(petTypes) {
        console.log("petTypes: ", petTypes);
        petTypesObject = petTypes;
      })
      .catch(function(err) {
        console.log("error getting types from PetFinder: ", err);
      });
  },
  searchPets: function() {
    var params = "?type=dog&size=small&coat=long&location=texas";
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "GET",
      url: "api/searchPets/" + params
      // data: JSON.stringify(example)
    })
      .then(function(petsFound) {
        // console.log("petTypes: ", petsFound);
        petsFoundObject = petsFound;
        // console.log(petsFoundObject);
        // location.reload();
      })
      .catch(function(err) {
        console.log("error getting types from PetFinder: ", err);
      });
  },
  choosePet: function(petId, customerId) {
    var bodyObj = { petId: petId, customerId: customerId };
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
var displayPetsFound = function() {
  var testArray = petsFoundObject.petsFound;
  console.log("testArray", testArray);
  var $pets = testArray.map(function(val) {
    var $a = $("<a>")
      .text(val.name)
      .attr("href", "/example/" + val.id);

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
var handleLoadPetTypesBtnClick = function() {
  console.log("loadTypes");

  API.loadPetTypes().then(function() {
    // refreshExamples();
  });
};

// ** ADDED BY SB
// handleSearchPetsBtnClick is called when loadSearch button is clicked
// variable petsFound is loaded with PetFinder petsFound object
var handleSearchPetsBtnClick = function(event) {
  event.preventDefault();
  console.log("loadSearchPets");

  API.searchPets().then(function() {
    displayPetsFound();
    // refreshExamples();
  });
};

// ** ADDED BY SB
// handleChooseBtnClick is called when a pet's choose button is clicked
// Sends the petfinder unique ID and customer ID to be stored in chosenPetsDB
var handleChooseBtnClick = function() {
  var idToChoose = $(this)
    .parent()
    .attr("data-id");
  var customerId = 1;
  API.choosePet(idToChoose, customerId).then(function() {
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

// ADDED BY BD
// var dummyArray = [
//   "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// ];

var surveyTaken = false;

var dummyArray = [
  "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1445820200644-69f87d946277?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
];

function addCards() {
  if (!surveyTaken) {
    $("#carousel-container").hide();
  } else {
    addIndicators();
    $("#carousel-container").show();
    $(".caro-controls").show();
    for (var i = 0; i < dummyArray.length; i++) {
      // if the survey has been taken and there are results, add images to cards in the carousel
      console.log(i);
      var newDiv = $("<div>");
      if (i === 0) {
        // first item in the carousel is 'active'
        newDiv.attr("class", "carousel-item active card");
        console.log("we've gotten to l164");
      } else {
        newDiv.attr("class", "carousel-item card");
        console.log("we've gotten to l167");
      }
      var image = $("<img>");
      image
        .attr("src", dummyArray[i])
        .attr("class", "searchResultImg card-img-top");
      newDiv.append(image);
      var cardBody = $("<div>").attr("class", "card-body");
      var cardTitle = $("<h5>")
        .attr("class", "card-title")
        .html(i);
      cardBody.append(cardTitle);
      newDiv.append(cardBody);
      $(".carousel-inner").append(newDiv);
    }
  }
}

function addIndicators() {
  for (var i = 0; i < dummyArray.length; i++) {
    if (i === 0) {
      var listItem = $("<li>")
        .attr("data-target", "#demo")
        .attr("data-slide-to", i)
        .attr("class", "active");
    } else {
      var listItem = $("<li>")
        .attr("data-target", "#demo")
        .attr("data-slide-to", i);
    }
    $(".carousel-indicators").append(listItem);
  }
}

addCards();

$("#surveyBtn").on("click", function() {
  if ($(this).attr("taken") === "false") {
    $("#header-container").hide();
    surveyTaken = true;
    $(this).attr("taken", "true");
    console.log($(this));
    addCards();
  }
});
