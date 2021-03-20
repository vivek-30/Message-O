const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Model = require('./database/model');
const router = express.Router();

const saltRounds = 10;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/chatAppUsers', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

router.get('/',(req, res) => {
    res.status(200).send({
        response: 'Server is successfully running ....',
        message: 'Please authenticate yourself to use this service.'
    });
});

router.get('/chat',(req, res) => {
    res.status(200).send({
        response: 'Server is successfully running....',
        message: 'Happy Chating.'
    });
});

router.post('/new-user', (req, res, next) => {
    const { name, email, password, contact } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        
        if(err) {
            res.status(500).send('Internal error while securing your password');
            next(); 
        }

        const NewUser = new Model({
            name,
            email,
            password: hash,
            contact
        });

        if(!NewUser) {
            res.status(500).send('Internal error while securing your password');
            next();
        }

        NewUser.save().then((user) => {
            res.status(200).send({
                response: 'You have successfully logged In. Welcome to the chat app',
                user
            });
        }).catch((error) => {
            if(error) {
                console.log('error', error);
                res.status(500).send({
                    response: 'There is problem with our server please try after some time',
                    error
                });
            }
        });
    });
});

module.exports = router;
