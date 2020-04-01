const controller = require('../controller/controller');
const logger = require('../logger');

async function registerUser(req, res) {
    logger.info(`POST /register API: Hit at ${(new Date()).getTime()}`);
    const response = controller.successResponse({});
    res.json(response);
}

module.exports = {
    register: registerUser
};
