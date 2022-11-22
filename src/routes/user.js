const { Router } = require('express');

const { userConnected } = require('../middlewares/userConnected');
const { adminConnected } = require('../middlewares/adminConected');
const controller = require('../controllers/UserController');

const router = Router();

router.post('/', controller.createUser);

router.get('/', controller.loginUser);

router.patch('/', userConnected, controller.editUser);

router.patch('/pass', userConnected, controller.editUserPass);

router.patch('/admin/:id', adminConnected, controller.editUserAdmin);

router.delete('/', userConnected, controller.deleteUser);

module.exports = router;
