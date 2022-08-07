const mongoose = require('mongoose');
const { Schema } = mongoose;

const Category = new Schema({
  name: {
    type: String,
    require: true
  }
});

mongoose.model('categories', Category);
