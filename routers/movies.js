const express = require('express');
const router = express.Router();
const {Movie,validateMovie} = require('./../models/movie');
const {Genre} = require('./../models/genre');
const auth = require('./../middleware/auth');
const admin = require('./../middleware/admin');

router.get("/", async(req,res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});


router.get("/:id", async(req,res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("The genre with the given id was not found.");

    res.send(movie);
});


router.post("/",auth, async (req,res) => {   
    const result =  validateMovie(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const genre =await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid Genre");

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);
});


router.put("/:id", auth, async(req,res) => {   
    const result =  validateMovie(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const genre = Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid Genre");

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        { 
          title: req.body.title,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });
    
      if (!movie) return res.status(404).send('The movie with the given ID was not found.');
      
      res.send(movie);
});


router.delete('/:id', [auth, admin], async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
});


module.exports = router;