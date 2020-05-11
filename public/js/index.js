/* eslint-disable indent */
// Get references to page elements


// *** Added by SB, selectors to onClick event handlers at bottom of this file: index.js
var $petFoundList = $("#petFound-list");
var $loadPetTypesBtn = $("#loadPetTypes"); // button to load type object from petfinder
var $searchPetsBtn = $("#searchPets");
var $signUpSubmitBtn = $('#signUpSubmitBtn');
var $logInSubmitBtn = $('#loginSubmitBtn');
var $searchSubmitBtn = $('#searchSubmitBtn');

// ADDED BY EO
// Function
/*var handleDeleteBtn = function(petId) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + petId
    })
    .then(function() {
      getPosts(postCategorySelect.val());
    });
}*/

var petTypesObject; //global object with petfinder type object for search
var petsFoundObject;

// var API for Ajax API calls now located in indexApiCalls.js in this directory.  
// ** Remember include: <script src="/js/indexApiCalls.js"></script> at bottom of .handleBars files


// ** ADDED BY SB
// displayPetsFound gets displays pets found in PetFinder and repopulates the list
// uses global petsFoundObject to populate table
// assumes API.loadPetTypes() has run and process.env.PETFINDER_ACCESS_TOKEN is valid
var displayPetsFound = function () {
  var petsArray = petsFoundObject.petsFound;
  console.log("petsArray", petsArray);
  var $pets = petsArray.map(function (val) {

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
      .addClass("btn btn-danger float-right delete")
      .text("Choose");

    $li.append($button);
    return $li;
  });
  $petFoundList.empty();
  $petFoundList.append($pets);
}


// ADDED BY BD
var searchTaken = false;

// var dummyArray = [
//   "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   "https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   "https://images.unsplash.com/photo-1445820200644-69f87d946277?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// ];

var dummyPhoto = "https://images.unsplash.com/photo-1445820200644-69f87d946277?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";


function addCards() {
  var dummyArray = petsFoundObject.petsFound;   // petsFoundObject is a global set in apiRoutes.js /searchPets route
  if (!searchTaken) {
    $("#carousel-container").hide();
  } else {
    addIndicators();
    $('#header-container').empty();
    $("#carousel-container").show();
    $("a.caro-controls").css("display", "flex");
    for (var i = 0; i < dummyArray.length; i++) {
      // if the survey has been taken and there are results, add images to cards in the carousel
      var newDiv = $("<div>");
      if (i === 0) {
        // first item in the carousel is 'active'
        newDiv.attr("class", "carousel-item active card");
      } else {
        newDiv.attr("class", "carousel-item card");
      }
      if (dummyArray[i].photos.length === 0) dummyArray[i].photos[0].full = dummyPhoto; // if no photo then use dummyPhoto
      var image = $("<img>");
      image
        .attr("src", dummyArray[i].photos[0].full)
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
  var dummyArray = petsFoundObject.petsFound;   // petsFoundObject is a global set in apiRoutes.js /searchPets route
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



// ** On-click events, per convention all call handlers in indexOnClickHandlers.js
//  **ADDED BY EO
// Navbar button onclick functions

$("#logOutBtn").on("click", function () {
  window.location.href = "/login";
});

$("#searchPageBtn").on("click", function () {
  handleSearchPageBtnClick();
  // window.location.href = "/search";
});

$signUpSubmitBtn.on("click", function () {
  handleSignUpSubmitBtnClick();
  window.location.href = "/homepage";
});

$logInSubmitBtn.on("click", function () {
  handleLoginSubmitBtnClick();
  window.location.href = "/homepage";
});

$("#homePageBtn").on("click", function () {
  window.location.href = "/homepage";
});

//
// ** ADDED BY SB
// Added event listeners for Friendly Neighborhood Pet Finder
$loadPetTypesBtn.on("click", handleLoadPetTypesBtnClick);
$searchPetsBtn.on("click", handleSearchPetsBtnClick);
$petFoundList.on("click", ".choose", handleChooseBtnClick);
$searchSubmitBtn.on("click", handleSearchSubmitBtnClick);