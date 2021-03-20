const express = require('express');
const mongoose = require('mongoose');
const Model = require('./database/model');
const router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/react_test', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

router.get('/',(req,res) => {
    res.status(200).send({
        response: 'Server is successfully running ....',
        message: 'Please authenticate yourself to use this service.'
    });
});

router.get('/chat',(req,res) => {
    res.status(200).send({
        response: 'Server is successfully running....',
        message: 'Happy Chating.'
    });
});

router.post('/newUser', (req,res) => {
    const { name, email, password, contact } = req.body;
    const NewUser = new Model({
        name,
        email,
        password,
        contact
    });

    NewUser.save().then((user) => {
        res.status(200).send({
            response: 'You have successfully logged In. Welcome to the chat app',
            user
        });
    }).catch((error) => {
        if(error){
            console.log(error)
            res.status(500).send({
                response: 'There is problem with our server please try after some time',
                error
            });
        }
    });
});

module.exports = router;
