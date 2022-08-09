const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/', categoryController.getCategory);

router.post('/new', categoryController.createCategory);

router.delete('/del/:id', categoryController.deleteCategory);

module.exports = router;
