const mongoose = require('mongoose');
require('../models/Book');
require('../models/Category');
const Book = mongoose.model('books');
const Category = mongoose.model('categories');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).send(categories);
  } catch (err) {
    console.log(`Houve um erro: ${err}`);

    res.staus(500).send({
      msg: "Houve um erro interno, tente novamente mais tarde"
    });
  }
}

const getCategory = async (req, res) => {
  const { name } = req.params;

  try {
    const category = await Category.findOne({ name });
    const books = await Book.find({ category: category._id });

    res.status(200).send({
      category,
      quantity: books.length,
      books
    })
  } catch (err) {
    console.log(`Houve um erro: ${err}`);

    res.staus(500).send({
      msg: "Houve um erro interno, tente novamente mais tarde"
    });
  }
}

const createCategory = async (req, res) => {
  const nameNewCategory = req.body.name.toLowerCase();
  const categoryExists = await Category.findOne({ name: nameNewCategory });

  if(categoryExists) {
    return res.status(422).send({
      msg: "Já exites uma categoria com esse nome"
    });
  }

  const category = new Category ({
    name: nameNewCategory
  });

  try {
    await category.save();

    res.status(201).send({
      msg: "Categoria criada com sucesso",
      data: {
        name: category.name
      }
    });
  } catch (err) {
    console.log(`Houve um erro: ${err}`);

    res.staus(500).send({
      msg: "Houve um erro interno, tente novamente mais tarde"
    });
  }
}

const editCategory = async (req, res) => {
  const idCategory = req.params.id;
  const category = {
   name: req.body.name
  }

  try {
    const oldCategory = await Category.findByIdAndUpdate(idCategory, category);

    res.status(200).send({
      msg: "Atualização feita com sucesso",
      oldData: {
        name: oldCategory.name
      },
      newData: category
    })
  } catch (err) {
    console.log(`Houve um erro: ${err}`);

    res.staus(500).send({
      msg: "Houve um erro interno, tente novamente mais tarde"
    });
  }
}

const deleteCategory = async (req, res) => {
  const idCategory = req.params.id;
  const force = req.query.force;
  const books = await Book.find({ category: idCategory });

  if(!idCategory) {
    return res.status(422).send({
      msg: "É necessário envar o id como parametro"
    });
  }

  if(books.length && force != "true") {
    return res.status(422).send({
      msg: "É necessário envar o id como parametro"
    }); 
  }

  try {
    const category = await Category.findByIdAndDelete(idCategory);

    if(!category) {
      return res.status(404).send({
        msg: "Não exite categoria com esse id"
      });
    }

    res.status(200).send({
      msg: "Categoria apagada com sucesso",
      data: category
    });

  } catch (err) {
    console.log(`Houve um erro: ${err}`);

    res.staus(500).send({
      msg: "Houve um erro interno, tente novamente mais tarde"
    });
  }
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory
}