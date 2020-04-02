const jwt = require('jsonwebtoken');
const { Fields, Keys, Status } = require('../constants');

function appendUserStatus(obj) {
    obj[Fields.STATUS] = Status.INACTIVE;
    obj[Fields.UPDATED_AT] = getCurrentTime();
}

function constructOkResponse(obj) {
    return {
        status: 'ok',
        statusCode: 200,
        result: obj
    };
}

function constructNokResponse(err, code) {
    const message = isString(err) ? err : err.message;
    return {
        status: 'nok',
        statusCode: code,
        error: message
    };
}

function formatTime(timestamp) {
    const dd = timestamp.getDate();
    const mm = timestamp.getMonth()+1;
    const yy = timestamp.getFullYear();
    const date = `${dd}/${mm}/${yy}`;
    const hours = timestamp.getHours();
    const minutes = '00';
    const seconds = '00';
    const time = `${hours}:${minutes}:${seconds}`;
    return {
        [Fields.DATE]: date,
        [Fields.TIME]: time
    };
}

function formatTimeslot(timeslot) {
    const beginTime = new Date(timeslot[Fields.TIME_FROM]);
    const begin = formatTime(beginTime);
    const endTime = new Date(timeslot[Fields.TIME_TO]);
    const end = formatTime(endTime);
    timeslot[Fields.BEGIN_DATE] = begin[Fields.DATE];
    timeslot[Fields.BEGIN_TIME] = begin[Fields.TIME];
    timeslot[Fields.END_DATE] = end[Fields.DATE];
    timeslot[Fields.END_TIME] = end[Fields.TIME];
    timeslot[Fields.SLOT_NO] = beginTime.getHours()+1;
}

function generateRandomId(obj) {
    const min = 0;
    const max = 9999999;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    obj[Fields.ID] = randomId;
}

function genreateToken(user) {
    const token = jwt.sign({
        email: user[Fields.EMAIL],
        user_id: user[Fields.ID],
        iat: Math.floor(Date.now()/1000),
        exp: Math.floor(Date.now()/1000 + 2*60)
    }, Keys.SIGN);
    user['access_token'] = token;
}

function getCurrentTime() {
    return (new Date()).getTime();
}

function hideMetaData(obj) {
    if (obj[Fields._ID]) {
        delete obj[Fields._ID];
    }
    if (obj[Fields.STATUS]) {
        delete obj[Fields.STATUS];
    }
    if (obj[Fields.UPDATED_AT]) {
        delete obj[Fields.UPDATED_AT];
    }
    if (obj[Fields.PASSWORD]) {
        delete obj[Fields.PASSWORD];
    }
}

function isString(item) {
    return typeof item === 'string';
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        const message = "Invalid token!";
        const response = constructNokResponse(message, 401);
        return res.json(response);
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, Keys.VERIFY);
        req.user = user;
        next();
    } catch (err) {
        const message = "Session expired! Login again!";
        const response = constructNokResponse(message, 403);
        return res.json(response);
    }
}

module.exports = {
    appendUserStatus,
    failureResponse: constructNokResponse,
    formatTimeslot,
    generateRandomId,
    genreateToken,
    hideMetaData,
    verifyToken,
    successResponse: constructOkResponse
};
