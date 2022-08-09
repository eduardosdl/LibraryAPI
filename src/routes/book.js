const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.get('/', bookController.getBooks);

router.post('/new', bookController.createBook);

router.delete('/del/:id', bookController.deleteBook);

module.exports = router;