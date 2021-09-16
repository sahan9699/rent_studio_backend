const  Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        maxlength: 10,
        required: true,    
    },
    isGold: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

}));


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().length(10).regex(/^[0-9]+$/).required(),
        isGold: Joi.boolean().required()
    };

    return Joi.validate(customer, schema);
}


exports.Customer = Customer;
exports.validateCustomer = validateCustomer;