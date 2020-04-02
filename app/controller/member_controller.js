const controller = require('../controller/controller');
const service = require('../services/member_services');
const logger = require('../../logger');

async function getMembers(req, res) {
    logger.info(`GET /members API: Hit at ${(new Date()).getTime()}`);
    try {
        const members = await service.getMembers();
        const response = controller.successResponse(members);
        res.json(response);
    } catch (err) {
        const response = controller.failureResponse(err, 400);
        res.json(response);
    }
}

module.exports = {
    getMembers
};
