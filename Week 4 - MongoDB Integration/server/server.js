const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

//Local imports
const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/Todo");
const {User} = require("./models/User");
const {ObjectID} = require("mongodb");

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
app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({
            todos,
            code: 'success'
        });
    }, (e) => {
        response.status(404).send(e);
    });
});
//Get specific TODO
app.get("/todos/:id", (request, response) => {
    var id = request.params.id;
    if(ObjectID.isValid(id)){
        Todo.findById(id).then((todo) => {
            if(todo)
                response.send({todo: todo});
            else
                response.status(404).send({status:"Todo not found"});
        }).catch((err) => {
            console.log("Error occured: ", err);
            response.send({status:"Error occured"});
        });
    }else{
        response.status(404).send({status: "Invalid ID"});
    }
});

//Removing
app.delete("/todos/:id", (request, response) => {
    var id = request.params.id;
    if(!ObjectID.isValid(id))
        return response.status(404).send();
    Todo.findByIdAndRemove(id).then((todo) => {
        if(todo == null)
            return response.status(400).send();
        response.send({todo});
    }).catch((err) => {
        response.status(404).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id))
        return res.status(404).send();

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    }).catch((err) => {
        res.send(404).send();
    });
});

app.listen(3000, ()=> {
    console.log("Started on Port 3000");
});

module.exports = {app};