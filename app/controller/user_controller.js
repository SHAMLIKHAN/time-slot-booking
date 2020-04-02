const controller = require('../controller/controller');
const validator = require('../validators/user_validator');
const service = require('../services/user_services');
const logger = require('../../logger');
const { Fields } = require('../constants');

async function addAvailableTimeslot(req, res) {
    logger.info(`POST /user/timeslot API: Hit at ${(new Date()).getTime()}`);
    const user = req.user;
    const timeslot = req.body;
    const error = validator.validateAddTimeslot(timeslot);
    if (error) {
        const response = controller.failureResponse(error, 200);
        res.json(response);
        return;
    }
    try {
        controller.formatTimeslot(timeslot);
        const result = await service.addTimeslot(user, timeslot);
        controller.hideMetaData(result);
        const response = controller.successResponse(result);
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

async function addFriend(req, res) {
    logger.info(`POST /user/friends API: Hit at ${(new Date()).getTime()}`);
    const user = req.user;
    const friend = req.body;
    const error = validator.validateAddFriend(friend);
    if (error) {
        const response = controller.failureResponse(error, 200);
        res.json(response);
        return;
    }
    try {
        const result = await service.addFriend(user, friend);
        const friends = result[Fields.FRIENDS];
        const response = controller.successResponse(friends);
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

async function deleteFriend(req, res) {
    logger.info(`DELETE /user/friends/:friend_id API: Hit at ${(new Date()).getTime()}`);
    const user = req.user;
    const friendId = parseInt(req.param(Fields.FRIEND_ID));
    try {
        await service.deleteFriend(user, friendId);
        const response = controller.successResponse({});
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

async function getFreinds(req, res) {
    logger.info(`GET /user/friends API: Hit at ${(new Date()).getTime()}`);
    const user = req.user;
    try {
        const result = await service.getFreinds(user);
        const friends = result[Fields.FRIENDS];
        const response = controller.successResponse({friends});
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

async function loginUser(req, res) {
    logger.info(`POST /login API: Hit at ${(new Date()).getTime()}`);
    const body = req.body;
    const error = validator.validateLoginUser(body);
    if (error) {
        const response = controller.failureResponse(error, 200);
        res.json(response);
        return;
    }
    try {
        const user = await service.login(body);
        controller.hideMetaData(user);
        controller.genreateToken(user);
        const response = controller.successResponse(user);
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

async function logoutUser(req, res) {
    logger.info(`POST /logout API: Hit at ${(new Date()).getTime()}`);
    const user = req.user;
    try {
        await service.logout(user);
        const response = controller.successResponse({});
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

async function registerUser(req, res) {
    logger.info(`POST /register API: Hit at ${(new Date()).getTime()}`);
    const body = req.body;
    const error = validator.validateRegisterUser(body);
    if (error) {
        const response = controller.failureResponse(error, 200);
        res.json(response);
        return;
    }
    try {
        controller.generateRandomId(body);
        controller.appendUserStatus(body);
        const user = await service.register(body);
        controller.hideMetaData(user);
        const response = controller.successResponse(body);
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

module.exports = {
    deleteFriend,
    getFreinds,
    login: loginUser,
    logout: logoutUser,
    postFreind: addFriend,
    postTimeslot: addAvailableTimeslot,
    register: registerUser
};
