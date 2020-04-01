const controller = require('../controller/controller');
const validator = require('../validators/user_validator');
const service = require('../services/user_services');
const logger = require('../../logger');

async function registerUser(req, res) {
    logger.info(`POST /register API: Hit at ${(new Date()).getTime()}`);
    const body = req.body;
    const error = validator.validateRegisterUser(body);
    if (error) {
        const response = controller.FailureResponse(error, 200);
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
        const response = controller.FailureResponse(err, 400);
        res.json(response);
    }
}

module.exports = {
    register: registerUser
};
