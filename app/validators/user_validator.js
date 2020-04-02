const { Fields } = require('../constants');

function validateAddFriend(friend) {
    if (!friend) {
        return 'friend details are not provided!';
    }
    if (!friend[Fields.USER_ID]) {
        return 'user_id is not provided!';
    }
    return;
}

function validateAddTimeslot(timeslot) {
    if (!timeslot) {
        return 'timeslot details are not provided!';
    }
    if (!timeslot[Fields.TIME_FROM]) {
        return 'time_from is not provided!';
    }
    if (!timeslot[Fields.TIME_TO]) {
        return 'time_to is not provided!';
    }
    const beginTime = new Date(timeslot[Fields.TIME_FROM]);
    const endTime = new Date(timeslot[Fields.TIME_TO]);
    
    if (beginTime > endTime) {
        return 'time_from can not exceed time_to';
    } else if (endTime - beginTime > 60*60*1000) {
        return 'timeslots should not exceed one hour!'
    }
    return;
}

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
    validateAddFriend,
    validateAddTimeslot,
    validateLoginUser,
    validateRegisterUser
};
