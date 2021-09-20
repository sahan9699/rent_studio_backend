const winston = require('winston');

const  Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const app = express(); 

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

winston.add(winston.transports.File, {filename: 'logfile.log'});

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));      