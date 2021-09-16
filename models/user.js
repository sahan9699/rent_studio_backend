const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: true  
    },
    email: {
        type: String,
        minlength: 5,
        maxLenght: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 1024
    }   
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;