/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable quotes */
/*eslint quotes: [2, "backtick"]*/
/*eslint-env es6*/



// import { INTEGER } from "sequelize/types";

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
    console.log("hello??")
    $(this).attr("src", "./images/favorited.png").attr("status", "favorited").attr("class", "heart btn deleteChosenPetBtn");
    
    // console.log("handleChooseBtnClick");
    var petId = $(this).attr("data-id");
    var petName = $(this).attr("petName");
    var petUrl = $(this).attr("petUrl");
    var petDescription = $(this).attr("petDescription");
    var petId = $(this).attr("data-id");
    var petImage = $(this).attr("petImage");
    console.log($(this).attr("petImage"));
    // console.log("idChosen", petId);
    var customerId = sessionStorage.getItem("customerId");
    var choosePetRequestObject = {
        petId: petId,
        customerId: customerId,
        petName: petName,
        description: petDescription,
        url: petUrl,
        petImage: petImage
    };
    API.choosePet(choosePetRequestObject).then(function () {
        console.log("API.choosePet success");
    });
};

// ** ADDED BY RZ and SB
// handleLoginSubmitBtnClick is called when a pet's choose button is clicked
// Sends the petfinder unique ID and customer ID to be stored in chosenPetsDB
var handleLoginSubmitBtnClick = function () {
    var customerObject = {
        userName: $('#userName').val(),
        userPassword: $('#userPassword').val()

    };
    console.log("customerObject", customerObject);
    API.login(customerObject).then(function (response) {
        console.log("API.login success" + response);
        if (response.length > 0) {
            sessionStorage.setItem("customerId", response[0].id);
            sessionStorage.setItem("userName", response[0].userName);
            window.location.href = "/homepage";
            console.log("Customer Id", sessionStorage.getItem("customerId"), "userName: ", sessionStorage.getItem("userName"));
        } else {
            // console.log(`Either no username or incorrect password for userName: ${$('#userName').val()}`);
            $("#errorModal").modal("show");
            $("#loginMessage").empty();
            $("#loginMessage").text(`User name not registered or incorrect password entered for user name: ${$('#userName').val()}`);
        }

    });
};
// ** ADDED BY RZ and SB
// handleChooseBtnClick is called when a pet's choose button is clicked
// Sends the petfinder unique ID and customer ID to be stored in chosenPetsDB
var handleSignUpSubmitBtnClick = function () {
    var newCustomerObject = {
        userFirstName: $("#userFirstName").val(),
        userLastName: $("#userLastName").val(),
        userName: $("#userSignUpName").val(),
        userEmail: $("#userEmail").val(),
        userZip: $("#userZip").val(),
        userPassword: $("#userSignUpPassword").val(),
        // userPassword: "tester",
    };
    API.signup(newCustomerObject).then(function (response) {
        console.log("error response object: ", response);
        $("#loginMessage").empty();
        if (typeof (response.id) === "number") {
            console.log("API.signup success");
            sessionStorage.setItem("customerId", response.id);
            sessionStorage.setItem("userName", response.userName);
            window.location.href = "/homepage";
        }
        else {
            $("#errorModal").modal("show");
            $("#loginMessage").html(`User name already in use - please try a different user name`);
            console.log("error response object: ", response.name);
            console.log("error response object: ", response.errors[0].message);

        }
    })
        // .catch(function (err) {
        //     console.log("error response object: ", err);
        // })
        ;

};

var handleLogOutBtnClick = function () {
    sessionStorage.clear();
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

var handleDeleteChosenPetBtnClick = function (petId) {
    // console.log("Delete button for chosen pet# " + petId);
    API.deletePet(petId).then(function (response) {
        // console.log(response);
        if (window.location.href.indexOf("/homepage") > -1) {
            window.location.replace("/homepage");
        }
        $(this).attr("src", "./images/unfavorited.png").attr("status", "unfavorited").attr("class", "heart btn choose");
        // location.reload();
    });
};

