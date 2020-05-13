/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// Get references to page elements


// *** Added by SB, selectors to onClick event handlers at bottom of this file: index.js
var $petFoundList = $("#petFound-list");
var $loadPetTypesBtn = $("#loadPetTypes"); // button to load type object from petfinder
var $searchPetsBtn = $("#searchPets");

var $signUpSubmitBtn = $("#signUpSubmitBtn");
var $logInSubmitBtn = $("#logInSubmitBtn");
var $searchSubmitBtn = $("#searchSubmitBtn");
var $logOutBtn = $("#logOutBtn");
var $homePageBtn = $("#homePageBtn");
var $searchPageBtn = $("#searchPageBtn");
var $deleteChosenPetBtn = $(".deleteChosenPetBtn");
var $carouselContainer = $("#carousel-container");

var customerId = 0;
var userName = "guest";

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

function addCards() {
  var dummyArray = petsFoundObject.petsFound;   // petsFoundObject is a global set in apiRoutes.js /searchPets route
  if (!searchTaken) {
    $("#carousel-container").hide();
  } else {
    addIndicators();
    $('#header-container').empty();
    $("#carousel-container").show();
    $(".carousel-inner").empty();
    $("a.caro-controls").css("display", "flex");
    
    for (var i = 0; i < dummyArray.length; i++) {
      // console.log(dummyArray[i]);
      // if the survey has been taken and there are results, add images to cards in the carousel
      var newDiv = $("<div class='caro-img'>");
      if (i === 0) {
        // first item in the carousel is 'active'
        newDiv.attr({ "class": "carousel-item active card", "data-id": dummyArray[i].id });  // added data-id for onClick choose
      } else {
        newDiv.attr({ "class": "carousel-item card", "data-id": dummyArray[i].id });   // added data-id for onClick choose
      }
      if (dummyArray[i].photos.length === 0) {
        console.log("no photo for photo " + i);
        dummyArray[i].photos.push({
          full: "https://t7-live-ahsd8.nyc3.cdn.digitaloceanspaces.com/animalhumanesociety.org/files/styles/animal_450x330/flypub/default_images/shy_10.jpg?itok=xmk-2ZMz"
        });
      } // if no photo then use dummyPhoto
      var image = $("<img>");
      image
        .attr("src", dummyArray[i].photos[0].full)
        .attr("class", "searchResultImg card-img-top");
      newDiv.append(image);
      var cardBody = $("<div>").attr("class", "card-body");
      var cardButton = $("<img src='./images/unfavorited.png' class='heart' status='unfavorited'>")                           // add button to choose
        .addClass("btn choose")             // add button to choose
        .attr({
          "data-id": dummyArray[i].id,
          "petName": dummyArray[i].name,
          "petUrl": dummyArray[i].url,
          "petDescription": dummyArray[i].description,
          "petImage": dummyArray[i].photos[0].full
        });
        // .text("Choose");                                    // add button to choose
      var cardTitle = $("<h5>")
        .attr("class", "card-title")
        .html(dummyArray[i].name);
      cardTitle.append(cardButton);
      var animalInfo = $("<p>").attr("class", "card-text");
      if (dummyArray[i].description == null) {
        dummyArray[i].description = "No pet description available";
      }
      animalInfo.html(`
      ${dummyArray[i].description} <br><br>
      Age: ${dummyArray[i].age} | 
      Status: ${dummyArray[i].status} |
      Contact: ${dummyArray[i].contact.email} ${dummyArray[i].contact.phone} <br><br>
      ID Number: ${dummyArray[i].id} <br><br>
      <a href="${dummyArray[i].url}" target="_blank">More Info</a>`);
      cardBody.append(cardTitle);
      cardBody.append(animalInfo);
      newDiv.append(cardBody);
      $(".carousel-inner").append(newDiv);
    }
  }
}

addFavorites();

function addFavorites() {
  // event.preventDefault();
  console.log("addingFavorites");
  var one = {
    id: 1,
    name: "example 1",
    full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/47976881/1/?bust=1589319840&width=720"
  }
  var two = {
    id: 2,
    name: "example 2",
    full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/47978196/2/?bust=1589334635&width=720"
  }
  var favoritesArray = [one, two];
  
  for (var i = 0; i < favoritesArray.length; i++) {
    var newDiv = $("<div>");
    if (i === 0) {
      newDiv.attr({ "class": "carousel-item active card", "data-id": favoritesArray[i].id });  // added data-id for onClick choose
    } else {
      newDiv.attr({ "class": "carousel-item card", "data-id": favoritesArray[i].id });   // added data-id for onClick choose
    }
    var title = $("<div>").attr("class", "card-header").html($("<h2>").text(favoritesArray[i].name));
    newDiv.append(title);

    var cBody = $("<div>").attr("class", "card-body");
    var row = $("<div>").attr("class", "row");
    newDiv.append(cBody);
    cBody.append(row);

    var imageHolder = $("<div>").attr("class", "col-6, petPicture");
    var favoritedImage = $("<img>").attr("src", favoritesArray[i].full);
    imageHolder.append(favoritedImage);
    var textHolder = $("<div>").attr("class", "col-6, petInfo");
    var paragraph = $("<p>").html(favoritesArray[i].name);
    textHolder.append(paragraph);
    row.append(imageHolder);
    row.append(textHolder);
    
    
    $("#favorited .carousel-inner").append(newDiv);
  } 
  
}

function addIndicators() {
  // $(".carousel-indicators").empty();
  var dummyArray = petsFoundObject.petsFound;   // petsFoundObject is a global set in apiRoutes.js /searchPets route
  for (var i = 0; i < dummyArray.length; i++) {
    // console.log(i);
    if (i === 0) {
      var listItem = $("<li>")
        .attr("data-target", "#searchCaro")
        .attr("data-slide-to", i)
        .attr("class", "active");
    } else {
      var listItem = $("<li>")
        .attr("data-target", "#searchCaro")
        .attr("data-slide-to", i);
    }
    $(".carousel-indicators").append(listItem);
  }
}

// ** On-click events, per convention all call handlers in indexOnClickHandlers.js
//  **ADDED BY EO
$signUpSubmitBtn.on("click", function () {
  handleSignUpSubmitBtnClick();
  // window.location.href = "/homepage";
});

$logInSubmitBtn.on("click", function () {
  console.log('log in button clicked');
  handleLoginSubmitBtnClick();
  // window.location.href = "/homepage";
  console.log("customerId returned", sessionStorage.getItem("customerId"));
  console.log("Customer Id and username returned", sessionStorage.getItem("customerId"), "userName: ", sessionStorage.getItem("userName"));

});

// ** ADDED BY SB AND EO
// Added event listeners for Friendly Neighborhood Pet Finder
$carouselContainer.on("click", ".choose", handleChooseBtnClick);
$loadPetTypesBtn.on("click", handleLoadPetTypesBtnClick);
$searchPetsBtn.on("click", handleSearchPetsBtnClick);
$petFoundList.on("click", ".choose", handleChooseBtnClick);
$searchSubmitBtn.on("click", handleSearchSubmitBtnClick);
$logOutBtn.on("click", handleLogOutBtnClick);
$homePageBtn.on("click", handleHomePageBtnClick);
$searchPageBtn.on("click", handleSearchPageBtnClick);
$deleteChosenPetBtn.on("click", function () {
  handleDeleteChosenPetBtnClick($(this).data("id"));
});
