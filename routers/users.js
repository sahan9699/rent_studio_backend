const express = require('express');
const router = express.Router();
const {User,validateUser} = require('./../models/user');


router.get("/", async(req,res) => {
        const users = await User.find().sort('name');
        res.send(users);
    });


router.get("/:id", async(req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send("The user with the given id was not found.");

    res.send(user);
   });


router.post("/", async (req,res) => {   
    const result =  validateUser(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User allready registered.");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await user.save(); 
    res.send(user);
});


module.exports = router;