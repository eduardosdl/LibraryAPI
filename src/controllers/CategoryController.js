const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');

const getCategory = async (req, res) => {
  Category.find().then((data) => {
    res.status(200).send(data);
  }).catch((err) => console.log(`Houve um erro: ${err}`));
}

const createCategory = async (req, res) => {
  const newCategory = {
    name: req.body.name.toLowerCase()
  }

  Category.create(newCategory).then(() => {
    res.status(200).send({
      message: "Categoria criada co  sucesso",
      data: newCategory
    });
  }).catch((err) => cosole.log(`Houve um erro: ${err}`));
}

const deleteCategory = async (req, res) => {
  Category.findByIdAndDelete(req.params.id).then((data) => {
    res.status(200).send({
      message: "Categoria apagada com sucesso",
      info: data
    });
  }).catch((err) => console.log(`Houve um erro: ${err}`));
}

module.exports = {
  getCategory,
  createCategory,
  deleteCategory
}
