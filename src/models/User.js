const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name: {
        type: String,
        require: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false

    }
}, 
{ 
    timestamps: true
});

mongoose.model('users', User);