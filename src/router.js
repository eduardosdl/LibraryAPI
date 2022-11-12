const { Router } = require('express');

const user = require('./routes/user');
const book = require('./routes/book');
const category = require('./routes/category');

const router = Router();

router.use('/user', user);
router.use('/book', book);
router.use('/category', category);

module.exports = router;
