const mongoose = require('mongoose');
const { Schema } = mongoose;

const Book = new Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    edition: {
        type: Number,
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        require: true
    }
});

mongoose.model('books', Book);