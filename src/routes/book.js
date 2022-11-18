const { Router } = require('express');

const { userConnected } = require('../helpers/userConnected');
const { adminConnected } = require('../helpers/adminConected');
const bookController = require('../controllers/BookController');

const router = Router();

router.post('/', adminConnected, bookController.createBook);

router.get('/', userConnected, bookController.getAllBooks);

router.get('/:id', userConnected, bookController.getBook);

router.put('/:id', adminConnected, bookController.editBook);

router.delete('/:id', adminConnected, bookController.deleteBook);

module.exports = router;
