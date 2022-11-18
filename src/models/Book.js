const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  edition: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
