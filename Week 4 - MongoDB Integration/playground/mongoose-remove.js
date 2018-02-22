const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/Todo");
const {User} =  require("./../server/models/User");

Todo.remove({}).then((result) => {
    console.log(result);
});

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5a8e7252057712114cf13138').then((todo) => {
    console.log(todo);
});

Todo.findOneAndRemove({_id: '5a8e7252057712114cf13138'}).then((todo) => {
    console.log(todo);
});