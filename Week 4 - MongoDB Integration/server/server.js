const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({
//     text: "Cook Dinner"
// });

// newTodo.save().then((doc) => {
//     console.log("Saved ToDo", doc)
// }, (err) => {
//     console.log("Unable to save todo");
// });

// var otherTodo = new Todo({
//     text: "         Print Journal Voucher       ",
//     completed: false,
//     completedAt: new Date().getTime()
// });
// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log("Unable to Solve", err);
// });

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    },

});
var newUser = new User({
    email: "krazy@me.com"
});
newUser.save().then((doc) => {
    console.log("User saved", doc);
}, (err) => {
    console.log("Failed to insert user");
});