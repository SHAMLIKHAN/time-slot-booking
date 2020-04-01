
function isString(item) {
    return typeof item === 'string';
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

module.exports = {
    successResponse: constructOkResponse,
    FailureResponse: constructNokResponse
};
