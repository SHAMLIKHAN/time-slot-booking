const express = require('express');
const controller = require('../controller/controller');
const userController = require('../controller/user_controller');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/friends', controller.verifyToken, userController.postFreind);
router.get('/friends', controller.verifyToken, userController.getFreinds);
router.post('/logout', controller.verifyToken, userController.logout);

module.exports = router;
