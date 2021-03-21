const express = require('express');
const mongoose = require('mongoose');
const User = require('./database/model');
const router = express.Router();
const { createToken, handleErrors } = require('./controllers/helperFunctions');
const verify = require('./middleware/authMiddleWare');

const MaxAge = 3 * 24 * 60 * 60;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/chatAppUsers', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

router.get('/',(req, res) => {
    res.status(200).send({
        response: 'Server is successfully running ....',
        message: 'Please authenticate yourself to use this service.'
    });
});

router.get('/chat', verify, (req, res) => {
    res.status(200).send({
        response: 'Server is successfully running....',
        message: 'Happy Chating.'
    });
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
        res.status(500).send('Internal error while creating a new user');
        next();
    }

    NewUser.save().then((user) => {
        res.status(200).send({
            response: 'You have successfully logged In. Welcome to the chat app',
            user
        });
    }).catch((error) => {
        if(error) {
            console.log('error while adding a new user', error);
            res.status(500).send({
                response: 'Internal error while saving you data',
                error
            });
        }
    });
});

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: MaxAge * 1000
        });
        res.status(200).json({ user: user._id });
    }
    catch(err) {
        const Errors = handleErrors(err);
        res.status(400).json({ Errors });
    }
});

module.exports = router;
