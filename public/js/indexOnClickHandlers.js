// ** These are all called from onClick events at bottom of index.js


// ** ADDED BY SB
// handleLoadPetTypesBtnClick is called when loadPetTypes button is clicked
// variable petTypes is loaded with PetFinder types object
var handleLoadPetTypesBtnClick = function () {
    console.log("loadTypes");
    API.loadPetTypes().then(function () {
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
