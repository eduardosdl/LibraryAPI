const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        defaul: false
    },
    creationDate: { 
        type: Date, 
        default: Date.now
    }
});

mongoose.model('users', User)