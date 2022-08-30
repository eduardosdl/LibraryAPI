const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { userConnected } = require('../helpers/userConnected');
const { adminConnected } = require('../helpers/adminConected');

router.get('/', userConnected, categoryController.getAllCategories);

router.get('/:name', userConnected, categoryController.getCategory);

router.post('/new', adminConnected, categoryController.createCategory);

router.put('/edit/:id', adminConnected, categoryController.editCategory);

router.delete('/del/:id', adminConnected, categoryController.deleteCategory);

module.exports = router;
