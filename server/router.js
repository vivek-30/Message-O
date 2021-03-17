const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).send({
        response: 'Server is successfully running ....',
        message: 'Please authenticate yourself to use this service.'
    })
});

router.get('/chat',(req,res) => {
    res.status(200).send({
        response: 'Server is successfully running....',
        message: 'Happy Chating.'
    })
});

module.exports = router;
