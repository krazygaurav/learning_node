const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//Creating port for heroku
const PORT = process.env.PORT || 3000;

//Creating a App to start with node
var app = express();

//To register comon pages for the website such as footer and header.
hbs.registerPartials(__dirname + "/views/partials")
//Required to start Node app
app.set("view engine", hbs);

//Registering Express Middleware
app.use((request, response, next) => {
    //Application will start only when we call next
    console.log("in 1");
    var now = new Date().toString();
    var log = `${now}: ${request.method}, ${request.url}`;
    fs.appendFileSync("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to server log");
        }
    });
    next();
});
//Express middleware for maintenance.hbs
app.use((request, response, next) => {
    console.log("in 2");
    response.render('maintenance.hbs');
});
//Adding this line here so that Middleware will not run the static files. To use static content of the WebApp
app.use(express.static(__dirname + "/public"));

//Creating helper function that can be called easily in hbs - Ex. home.hbs
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//Access using localhost:3000
app.get('/', (request, response) => {
    var json = {
        pageTitle: 'About Page',
        name: 'Gaurav',
        likes: ['Hiking', 'Adventrure'],
    };
    response.render("home.hbs", json);
});

app.get('/about', (request, response) => {
    var json = {
        pageTitle: 'About Page',
    };
    response.render("about.hbs", json);
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Bad Request",
    });
});

app.listen(PORT, () => {
    console.log(`Server is up on Port ${PORT}` );
});