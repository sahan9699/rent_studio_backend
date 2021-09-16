const express = require('express');
const mongoose = require('mongoose');
const  Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routers/genres');
const customers = require('./routers/customers');
const movies = require('./routers/movies');
const rentals = require('./routers/rentals');
const users = require('./routers/users');


const app = express();
app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

mongoose.connect('mongodb://localhost/rent_studio')
    .then(() => { console.log('Connected to MongoDB....')})
    .catch((e) => {console.error('Could not Connected to MongoDB...', e)});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));      