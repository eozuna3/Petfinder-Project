/* eslint-disable prettier/prettier */
/* eslint-disable indent */

// ** These are all called from onClick events at bottom of index.js

// ** ADDED BY SB
// handleLoadPetTypesBtnClick is called when loadPetTypes button is clicked or from searchSubmitBtnClick to start doing searches 
// variable petTypes is loaded with PetFinder types object
var handleLoadPetTypesBtnClick = function () {
    console.log("Going for token and petTypes object from petFinder");
    API.loadPetTypes().then(function () {
    });
};


// ** brought in from index.js by SB to standardize all onClick event handlers in this file
//  called from searchPageBtn onClick event, load petfinder.com token and pet types in petTypesObject, then load search page



// ** brought in from index.js by SB to standardize all onClick event handlers in this file
// Called from searchSubmitBtn click event, load cards with search data
var handleSearchSubmitBtnClick = function (event) {
    event.preventDefault();
    // console.log("Going for token and petTypes object from petFinder: ", petTypeObject);  // on every search
    API.loadPetTypes().then(function (petTypesObject) {
        // here could add code to load petTypesObject in the search, in event petFinder changes search categories
        // Gather user selections from input fields and call API.searchPets
        var query = {
            type: $("#type").val(),
            breed: $("#breed").val(),
            size: $("#size").val(),
            gender: $("#gender").val(),
            age: $("#age").val(),
            coat: $("#coat").val()
        };
        // console.log(query);
        API.searchPets(query).then(function () {
            // console.log("petsFoundObject: ", petsFoundObject);  // petsFoundObject is a global set in API.searchPets, 
            // but could be returned from API as well.
            searchTaken = true;
            addCards();

            if ($(this).attr("taken") === "false") {
                $("#header-container").hide();
                searchTaken = true;
                $(this).attr("taken", "true");
                console.log($(this));
                // addCards();
            }
        });
    });
}


// ** ADDED BY SB  this is a special on index.handlebars, console logs the 20 pet array, just for testing load index.js
// handleSearchPetsBtnClick is called when loadSearch button is clicked
// variable petsFound is loaded with PetFinder petsFound object
var handleSearchPetsBtnClick = function (event) {
    event.preventDefault();
    console.log("loadSearchPets");
    var query = {
        type: "dog",
        size: "small",
        coat: "long",
        location: "texas"
    };
    API.searchPets(query).then(function () {
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
        console.log("API.choosePet success");
    });
};

// ** ADDED BY RZ and SB
// handleLoginSubmitBtnClick is called when a pet's choose button is clicked
// Sends the petfinder unique ID and customer ID to be stored in chosenPetsDB
var handleLoginSubmitBtnClick = function () {
    var customerObject = {};
    API.login(customerObject).then(function () {
        console.log("API.login success");
    });
};
// ** ADDED BY RZ and SB
// handleChooseBtnClick is called when a pet's choose button is clicked
// Sends the petfinder unique ID and customer ID to be stored in chosenPetsDB
var handleSignUpSubmitBtnClick = function () {
    var newCustomerObject = {};
    API.signup(newCustomerObject).then(function () {
        console.log("API.signup success");
    });
};

var handleLogOutBtnClick = function () {
  window.location.replace("/login");
};

var handleHomePageBtnClick = function () {
    window.location.replace("/homepage");
};

var handleSearchPageBtnClick = function () {
    // event.preventDefault();
    /*API.loadPetTypes().then(function (petTypesObject) {
        console.log("Going for token and petTypes object from petFinder: ", petTypesObject);
    });*/
    window.location.href = "/search";
};
