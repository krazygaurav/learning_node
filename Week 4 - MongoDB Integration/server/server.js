var express = require("express");
var bodyParser = require("body-parser");

//Local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/Todo");
var {User} = require("./models/User");

var app = express();

//Middleware
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text
    });
    todo.save().then((doc) => {
        response.send(doc);
    }, (err) => {
        response.status(400).send(err);
        console.log("Error occured while saving");
    });
});



app.listen(3000, ()=> {
    console.log("Started on Port 3000");
});