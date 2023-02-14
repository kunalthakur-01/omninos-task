const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const userRoute = require('./routes/UserRoutes');
const cartRoute = require('./routes/cartRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-width, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});


app.use('/api', userRoute);

app.use('/api/cart', cartRoute);


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});



mongoose.connect('mongodb+srv://kunal-thakur:kunal25@cluster0.bfzhgmk.mongodb.net/task?retryWrites=true&w=majority')
    .then(result => {
        app.listen(5000);
        console.log('connected');
    })
    .catch(err => {
        console.log(err);
    });