const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');
const { userConnected } = require('../helpers/userConnected');
const { adminConnected } = require('../helpers/adminConected');

router.post('/new', controller.newUser);

router.get('/login', controller.loginUser);

router.patch('/edit/:id', userConnected, controller.editUser);

router.patch('/edit/pass', userConnected, controller.editUserPass);

router.patch('/makeadm/:id', adminConnected, controller.makeAdmin);

router.delete('/del/:id', userConnected, controller.deleteUser);

module.exports = router;