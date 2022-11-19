const { Router } = require('express');

const user = require('./routes/user');
const book = require('./routes/book');
const category = require('./routes/category');

const router = Router();

router.use('/users', user);
router.use('/books', book);
router.use('/categories', category);

module.exports = router;
