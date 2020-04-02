const express = require('express');
const memberController = require('../controller/member_controller');

const router = express.Router();

router.get('/', memberController.getMembers);

module.exports = router;
