const express = require('express');
const controller = require('../controller/controller');
const userController = require('../controller/user_controller');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/friends', controller.verifyToken, userController.postFreind);
router.get('/friends', controller.verifyToken, userController.getFreinds);
router.delete('/friends/:friend_id', controller.verifyToken, userController.deleteFriend);
router.post('/timeslot', controller.verifyToken, userController.postTimeslot);
router.get('/timeslot', controller.verifyToken, userController.getTimeslots);
router.delete('/timeslot/:timeslot_id', controller.verifyToken, userController.deleteTimeslot);
router.get('/friends/:friend_id/timeslot', controller.verifyToken, userController.getFreindTimeslots);
router.post('/friends/:friend_id/timeslot', controller.verifyToken, userController.postFreindTimeslot);
router.post('/logout', controller.verifyToken, userController.logout);

module.exports = router;
