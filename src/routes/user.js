const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');

router.post('/new', controller.newUser);

router.get('/login', controller.loginUser);

router.patch('/edit/:id', controller.editUser);

router.patch('/edit/pass', controller.editUserPass);

router.patch('/makeadm/:id', controller.makeAdmin);

router.delete('/del/:id', controller.deleteUser);

module.exports = router;