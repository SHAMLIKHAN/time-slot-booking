const { Fields } = require('../constants');

function validateLoginUser(user) {
    if (!user) {
        return 'user details are not provided!';
    }
    if (!user[Fields.USER_ID]) {
        return 'user_id is not provided!';
    }
    if (!user[Fields.PASSWORD]) {
        return 'password is not provided!';
    }
    return;
}

function validateRegisterUser(user) {
    if (!user) {
        return 'user details are not provided!';
    }
    if (!user[Fields.NAME]) {
        return 'name is not provided!';
    }
    if (!user[Fields.EMAIL]) {
        return 'email is not provided!';
    }
    if (!user[Fields.PASSWORD]) {
        return 'password is not provided!';
    }
    return;
}

module.exports = {
    validateLoginUser,
    validateRegisterUser
};
