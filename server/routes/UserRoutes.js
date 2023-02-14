const express = require('express');
const User = require('../models/userModel');
const HttpError = require('../models/httpErrorModel');

const router = express.Router();

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err)
        const error = new HttpError('Login failed, please try again later.', 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError('No account exist, create an account', 401);
        return next(error);
    }

    res.status(200).json({ userId: existingUser._id, email: existingUser.email });
})


router.post('/signup', async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err)
        const error = new HttpError('Signup failed, please try again later.', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User already exists, please login instead', 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password
    });

    try {
        await createdUser.save();
        // console.log(response);
    } catch (err) {
        console.log(err)
        const error = new HttpError('Signup failed, please try again later.', 500);
        return next(error);
    }

    res.status(201).json({ userId: createdUser._id, email: createdUser.email });
});

module.exports = router;