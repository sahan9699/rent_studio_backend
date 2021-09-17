const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const {User} = require('./../models/user')

const router = express.Router();

router.post("/", async (req,res) => {   
    const result =  validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invaled email or password.");

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) return res.status(400).send("Invaled email or password.");

    res.send(true);
});


function validate(req) {
    const schema = {
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(req, schema);
}

module.exports = router;