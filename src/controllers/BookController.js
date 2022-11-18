const Book = require('../models/Book');

const createBook = async (req, res) => {
  const {
    name, author, edition, category,
  } = req.body;

  if (!name || !author) {
    return res.status(422).send({
      error: 'Name and author are required',
    });
  }

  const book = await Book.create({
    name,
    author,
    edition,
    category,
  });

  res.status(201).send(book);
};

const getAllBooks = async (req, res) => {
  const books = await Book.find().populate('category');

  res.status(200).send(books);
};

const getBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).send({
      msg: 'livro não encontrado',
    });
  }

  res.status(200).send(book);
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const {
    name, author, edition, category,
  } = req.body;

  await Book.findByIdAndUpdate(id, {
    name,
    author,
    edition,
    category,
  });

  res.status(200).send({
    name, author, edition, category,
  });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  await Book.findByIdAndDelete(id);

  res.sendStatus(204);
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  editBook,
  deleteBook,
};
