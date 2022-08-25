const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { userConnected } = require('../helpers/userConnected');
const { adminConnected } = require('../helpers/adminConected');

router.get('/', categoryController.getCategory);

router.post('/new', categoryController.createCategory);

router.put('/edit/:id', categoryController.editCategory);

router.delete('/del/:id', categoryController.deleteCategory);

module.exports = router;
