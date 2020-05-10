// The API object contains methods for each kind of request we'll make
// module.exports = function () {
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
        var params = "?type=dog&size=small&coat=long&location=texas"; //currently not used
        var query = {
            type: "dog",
            size: "small",
            coat: "long",
            location: "texas"
        };
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
                petsFoundObject = petsFound;
                console.log(petsFoundObject);
                // location.reload();
            })
            .catch(function (err) {
                console.log("error getting types from PetFinder: ", err);
            });
    },
    choosePet: function (petId, customerId) {
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
//     return API;
// }