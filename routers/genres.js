const express = require('express');
const router = express.Router();
const {Genre,validateGenre} = require('./../models/genre');
const auth = require('./../middleware/auth');
const admin = require('./../middleware/admin');


router.get("/", async(req,res,next) => {
    try{
        const genre = await Genre.find().sort('name');
        res.send(genre);
    }catch(ex) {
       next(ex);
    }
       
    });


router.get("/:id", async(req,res,next) => {
    try{
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(404).send("The genre with the given id was not found.");

        res.send(genre);
    }catch(ex) {
        next(ex);
    }
   
   });


router.post("/", auth, async (req,res,next) => {   
    const result =  validateGenre(req.body);  
    if(result.error) return res.status(400).send(result.error.details[0].message);

    try {
        const genre = new Genre({name: req.body.name});
         await genre.save();
        res.send(genre);
    }catch(ex) {
        next(ex);
    }
    
});


router.put("/:id",auth, async (req,res,next) => {
    const result = validateGenre(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    try{
        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},{new: true});
        if(!genre) return res.status(404).send("The genre with the given id was not found.");
        res.send(genre);
    }catch(ex) {
        next(ex);
    }
  
});

router.delete("/:id",[auth, admin], async (req,res,next) => {
    try{
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if(!genre) return res.status(404).send("The genre with the given id was not found.");
        res.send(genre);
    }catch(ex) {
        next(ex);
    }

});


module.exports = router;