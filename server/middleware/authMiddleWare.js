const jwt = require('jsonwebtoken');
const User = require('../database/model');
require('dotenv').config();

const Secret = process.env.SECRET;

const verify = (req, res) => {

    const token = req.cookies.jwt;

    if(!token) {
        res.status(401).json({ 
            error: 'Unauthorized: No Token To Verify.' 
        });
    }
    else {
        jwt.verify(token, Secret, (err, validToken) => {
            if(err) {
                // console.log('invalid token', err.message);
                res.status(401).json({ error: 'You are not an authenticated user' });
            }
            else {
                // console.log('validToken - ', validToken);
                User.findById(validToken.id).then(({ name }) => {
                    res.status(200).json({ 
                        success: 'Successfully Authenticated. Happy Chating',
                        name
                    });
                })
                .catch((error) => {
                    res.status(501).json({
                        error
                    });
                })
            }
        });
    }
}

module.exports = verify;
