// this user interface search needs to be added
console.log({{{ petType }}});
console.log(petType);

Handlebars.registerHelper('json', function (content) {
    return JSON.stringify(content);
});
var petSetup = {{{ json petType }}};