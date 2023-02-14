const express = require('express');
const Router = express.Router();
const Cart = require('../models/cartModel');
const HttpError = require('../models/httpErrorModel');

Router.get('/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    let existingCart;

    try {
        existingCart = await Cart.findOne({ userId });
        console.log(existingCart)
    } catch (err) {
        const error = new HttpError('Something went wrong, try again later', 500);
        return next(error);
    }

    res.status(200).json({ userCart: existingCart });
});

module.exports = Router;