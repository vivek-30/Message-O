const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Model = mongoose.model('user',userSchema);

module.exports = Model;
