const express = require('express');
const router = express = exxpress.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.geetBooks);

router.post('new', bookController.createBook);

router.delete('del/:id', bookController.deleteBook);

module.exports = router;