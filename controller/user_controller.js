const controller = require('../controller/controller');

async function registerUser(req, res) {
    const response = controller.successResponse({});
    res.json(response);
}

module.exports = {
    register: registerUser
};
