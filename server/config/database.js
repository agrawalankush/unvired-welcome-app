const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<production database string>
 */

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
} else {
    console.log('Devlopment connection On!!');
    mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
}
