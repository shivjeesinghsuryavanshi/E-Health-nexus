require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.DB_URL;

//asynchronous func - returns a promise
mongoose.connect(url)
    .then((result) => {
        console.log('database connected');

    }).catch((err) => {
        console.log('Database connection failed:');
        console.error(err);
    });

module.exports = mongoose;