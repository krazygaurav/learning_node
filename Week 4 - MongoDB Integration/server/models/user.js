const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true,
        validate: {
            validator : (value) => {
                return validator.isEmail(value);
            },
            message: `{VALUE} is not a valid module`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = "auth";
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access: access
    }, 'abc123').toString();

    user.tokens.push({
        access: access,
        token: token
    });

    return user.save().then(() => {
        return token;
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = {User};