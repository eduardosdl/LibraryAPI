const mongoose = require('mongoose');
require('../models/Book');
require('../models/Category');
const Book = mongoose.model('books');
const Category = mongoose.model('categories');

const getBooks = async (req, res) => {
    try { 
        const books = await Book.find();

        res.status(200).send(books);
    } catch (err) {
        console.log(`Houve um erro: ${err}`);

        res.status(500).send({
            msg: "houve um erro tente novamente mais tarde"
        });
    }
}

const createBook = async (req, res) => {
    const { name, author, edition } = req.body;

    const category = await Category.findOne({ name: req.body.category });
    
    if(!category) {
        return res.status(404).send({
            msg: "Categoria não encontrada"
        });
    }

    const book = new Book({
        name,
        author,
        edition,
        category: category._id
    });

    try {
        await book.save();

        res.status(201).send({
            msg: "Livro criado com sucesso",
            data: book
        });
    } catch (err) {
        console.log(`Houve um erro: ${err}`);

        res.status(500).send({
            msg: "houve um erro tente novamente mais tarde"
        });
    }
}

const deleteBook = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Book.findByIdAndDelete(id);

        res.status(200).send({
            message: "Livro apagado com sucesso",
            info: book
        });
    } catch (err) {
        console.log(`Houve um erro: ${err}`);

        res.status(500).send({
            msg: "houve um erro tente novamente mais tarde"
        });
    }
}

module.exports = {
    getBooks,
    createBook,
    deleteBook
}