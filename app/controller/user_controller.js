const controller = require('../controller/controller');
const validator = require('../validators/user_validator');
const service = require('../services/user_services');
const logger = require('../../logger');

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
        const response = controller.successResponse(user);
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
    login: loginUser,
    register: registerUser
};
