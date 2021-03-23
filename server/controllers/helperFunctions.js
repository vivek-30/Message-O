const jwt = require('jsonwebtoken');

const MaxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {

    let errors = { email: '', password: '' };
  
    if (err.message === 'Incorrect Email') {
        errors.email = 'This email is not registered yet!';
    }
  
    if (err.message === 'Incorrect Password') {
        errors.password = 'The password you provide is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'This email is already registered.Please try with a different email.';
        return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    
    return errors;
}

const createToken = (id, Secret) => {
    return jwt.sign({ id }, Secret, {
        expiresIn: MaxAge
    });
}

module.exports = {
    createToken,
    handleErrors
}
