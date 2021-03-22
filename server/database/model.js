const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'Email is required field' ]
    },
    password: {
        type: String,
        required: [ true, 'Password is required field' ],
        minlenght: [ 6, 'Password must be atleast 6 characters long' ]
    },
    contact: {
        type: Number
    }
});

// configure pre hook.
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        // Return true if matches else return false
        const verified = await bcrypt.compare(password, user.password);
        if(verified) {
            return user;
        }else {
            throw Error('Incorrect Password');
        }
    }else {
        throw Error('Incorrect Email');
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;
