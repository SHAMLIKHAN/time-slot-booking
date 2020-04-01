const { Fields, Status } = require('../constants');

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

function generateRandomId(obj) {
    const min = 0;
    const max = 9999999;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    obj[Fields.ID] = randomId;
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

module.exports = {
    appendUserStatus: appendUserStatus,
    failureResponse: constructNokResponse,
    generateRandomId: generateRandomId,
    hideMetaData: hideMetaData,
    successResponse: constructOkResponse
};
