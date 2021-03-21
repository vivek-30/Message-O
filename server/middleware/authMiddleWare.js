const jwt = require('jsonwebtoken');
const secret = 'super secret chat-app in react';

const verify = (req, res, next) => {

    const token = req.cookies.jwt;

    if(!token) {
        res.status(401).send('Unauthorized: No Token To Verify.');
    }
    else {
        jwt.verify(token, secret, (err, validToken) => {
            if(err) {
                console.log('invalid token', err.message);
                res.status(401).send('You are not an authenticated user');
            }
            else {
                console.log('validToken - ', validToken);
                next();
            }
        });
    }
}

module.exports = verify;
