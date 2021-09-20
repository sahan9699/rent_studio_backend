const winston = require('winston');
const mongoose = require('mongoose');



module.exports = function() {

    mongoose.connect('mongodb://localhost/rent_studio')
        .then(() => { winston.info('Connected to MongoDB....')})
        .catch((e) => {
            winston.error('Could not Connected to MongoDB...', e);
            process.exit(1);
        });

}