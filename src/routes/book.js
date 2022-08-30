const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');
const { userConnected } = require('../helpers/userConnected');
const { adminConnected } = require('../helpers/adminConected');

router.get('/', userConnected, bookController.getAllBooks);

router.get('/:name', userConnected, bookController.getBook);

router.post('/new', adminConnected, bookController.createBook);

router.put('/edit/:id', adminConnected, bookController.editBook);

router.delete('/del/:id', adminConnected, bookController.deleteBook);

module.exports = router;