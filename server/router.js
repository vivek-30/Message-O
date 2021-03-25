const express = require('express');
const mongoose = require('mongoose');
const User = require('./database/model');
const router = express.Router();
const { createToken, handleErrors } = require('./controllers/helperFunctions');
const verify = require('./middleware/authMiddleWare');
require('dotenv').config();

const Secret = process.env.SECRET;
const URI = process.env.DATABASE_URI;
const MaxAge = 3 * 24 * 60 * 60;

mongoose.Promise = global.Promise;
mongoose.connect(URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

router.get('/', (req, res) => {
    res.status(200).send({
        response: 'Server is successfully running ....',
        message: 'Please authenticate yourself to use this service.'
    });
});

router.get('/chat', verify, (req, res) => {
    res.status(200).send('Successfully Authenticated. Happy Chating');
});

router.post('/sign-up', (req, res, next) => {

    const { name, email, password, contact } = req.body;

    const NewUser = new User({
        name,
        email,
        password,
        contact
    });

    if(!NewUser) {
        res.status(500).json({
            error: 'Internal Server Error while creating a new user'
        });
        next();
    }

    NewUser.save().then((user) => {
        const token = createToken(user._id, Secret);
        res.cookie('jwt', token, { 
            httpOnly: true, 
            maxAge: MaxAge * 1000,
            sameSite: 'none',
            secure: true
        });
        res.status(201).json({ user: user._id });
    }).catch((error) => {
        if(error) {
            // console.log('Error while adding a new user', error);
            res.status(500).json({
                response: 'Internal Server Error while saving you data',
                error
            });
        }
    });
});

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, Secret);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: MaxAge * 1000,
            sameSite: 'none',
            secure: true
        });
        res.status(200).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        // console.log('Error occurred while logging in a user', err);
        res.status(401).json({ errors });
    }
});

router.get('/logout', (req, res, next) => {

    const token = res.cookies.jwt;

    if(token) {
        res.cookie('jwt', '', {
            httpOnly: true,
            maxAge: 1,
            sameSite: 'none',
            secure: true
        });
        res.status(200).send('logged out successfully');
    }
    else {
        res.status(404).send('No User Found');
    }
    
    next();
});

module.exports = router;
