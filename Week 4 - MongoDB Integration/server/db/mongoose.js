var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports = {mongoose}

//For Heroku only
// process.env.NODE_ENV ==== "production"
// process.env.NODE_ENV ==== "dev"
// process.env.NODE_ENV ==== "test"
