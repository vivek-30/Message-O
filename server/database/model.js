const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number
    }
});

userSchema.pre('save',(next) => {
    if(this.isNew){
        const document = this;
        bcrypt.hash(document.password,saltRounds,(err, hashedPassword) => {
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

const Model = mongoose.model('user',userSchema);

module.exports = Model;
