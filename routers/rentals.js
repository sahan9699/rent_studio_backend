const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Fawn = require('fawn');
const {Rental,validateRental} = require('./../models/rental');
const {Customer} = require('./../models/customer');
const {Movie} = require('./../models/movie');

// Fawn.init(mongoose);  

router.get("/", async(req,res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});


router.get("/:id", async(req,res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send("The rental with the given id was not found.");

    res.send(rental);
});


router.post("/", async (req,res) => {   
    const result =  validateRental(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Invalid customer");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid movie");

    if (movie.numberInStock === 0) return res.status(400).send('Movie no in stock');

    let rental = new Rental({
        customer: { 
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone,
        }, 
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });


    await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
    // try {
    //     new Fawn.Task()
    //     .save('rentals'. rental)
    //     .update('movies', {_id:movie._id}, {
    //         $inc: {numberInStock: -1}
    //     })
    //     .run();
    //     res.send(rental);
    // }
    // catch(ex) {
    //    res.status(500).send('Somthing worng');
    // } 
});


router.put("/:id", async (req,res) => {   
    const result =  validateRental(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Invalid customer");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid movie");

    const rental = await Rental.findByIdAndUpdate(req.params.id,
        { 
            customer: { 
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone,
            }, 
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        },
         { new: true });
     if (!rental) return res.status(404).send('The rental with the given ID was not found.');
     res.send(rental);
});


router.delete('/:id', async (req, res) => {
    const movie = await Rental.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
});

module.exports = router;