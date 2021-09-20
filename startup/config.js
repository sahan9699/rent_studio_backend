const winston = require('winston');
const config = require('config');

module.exports = function() {

    if(!config.get('jwtPrivateKey')) {
        winston.error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }

}