var express = require("express");
var bodyParser = require("body-parser");

//Local imports
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/Todo");
var {User} = require("./models/User");
var {ObjectID} = require("mongodb");

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

// describe('DELETE /todos/"id', () => {
//     it("should remove a todo", (done) => {
//         var hexId = todos[1]._id.toHexString();

//         request(app)
//             .delete(`/todo/${hexId}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo._id).toBe(hexId);
//             })
//             .end((err, res) => {
//                 if(err)
//                     return done(err);

//                 Todo.findById(hexId).then((todo) => {
//                     expect(todo).toNotExist();
//                     done();
//                 }).catch((err) => done(err));
//             });
//     });
// });


app.listen(3000, ()=> {
    console.log("Started on Port 3000");
});

module.exports = {app};