const { Router } = require('express');

const { userConnected } = require('../middlewares/userConnected');
const { adminConnected } = require('../middlewares/adminConected');
const categoryController = require('../controllers/CategoryController');

const router = Router();

router.post('/', adminConnected, categoryController.createCategory);

router.get('/', userConnected, categoryController.findAllCategories);

router.get('/:id', userConnected, categoryController.findCategory);

router.put('/:id', adminConnected, categoryController.editCategory);

router.delete('/:id', adminConnected, categoryController.deleteCategory);

module.exports = router;
