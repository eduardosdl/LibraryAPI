const mongoose = require('mongoose');
require('../models/Book');
require('../models/Category');
const Book = mongoose.model('books');
const Category = mongoose.model('categories');

const getBooks = async (req, res) => {
    Book.find().then((books) => {
        res.status(200).send(books);
    }).catch((err) => {
        console.log(`Houve um erro: ${err}`)
    });
}

const createBook = async (req, res) => {
    const category = await Category.findOne({
        name: req.body.category
    });

    const newBook = {
        name: req.body.name,
        author: req.body.author,
        edition: req.body.edition,
        category: category.id
    }

    Book.create(newBook).then(() => {
        res.status(200).send({
            message: "novo livro criado com sucesso",
            data: newBook
        }).catch((err) => {
            console.log(`Houve um erro: ${err}`);
        })
    })
}

const deleteBook = async (req, res) => {
    Book.findByIdAndDelete(req.params.id).then((Book) => {
        res.status(200).send({
            message: "Livro apagado com sucesso",
            info: book
        });
    }).catch((err) => {
        console.log(`houve um erro: ${err}`);
    });
}

module.exports = {
    getBooks,
    createBook,
    deleteBook
}