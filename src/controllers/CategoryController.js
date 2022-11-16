const { Types } = require('mongoose');

const { ObjectId } = Types;

const Book = require('../models/Book');
const Category = require('../models/Category');

const createCategory = async (req, res) => {
  const categoryName = req.body.name.toLowerCase();
  const categoryExists = await Category.findOne({ name: categoryName });

  if (categoryExists) {
    return res.status(400).send({
      msg: 'This category already exists',
    });
  }

  const category = await Category.create({ name: categoryName });

  res.status(201).send(category);
};

const findAllCategories = async (req, res) => {
  const categories = await Category.find();

  res.status(200).send(categories);
};

const findCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'category',
        as: 'books',
      },
    },
  ]);

  res.status(200).send(category);
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    return res.status(400).send({
      error: 'This category already exists',
    });
  }

  await Category.updateOne({ id }, { name });

  res.status(200).send({
    id,
    name,
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { force } = req.query;
  const books = await Book.find({ category: id });

  if (books.length && force !== 'true') {
    return res.status(400).send({
      error: 'Cannot delete category, have books inside',
    });
  }

  await Category.deleteOne({ id });
  await Book.updateMany({ category: id }, { category: null });

  res.sendStatus(200);
};

module.exports = {
  createCategory,
  findAllCategories,
  findCategory,
  editCategory,
  deleteCategory,
};
