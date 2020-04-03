const { Fields } = require('../constants');

function validateAddFriend(friend) {
    if (!friend[Fields.FRIEND_ID]) {
        return 'friend_id is required.';
    }
    return;
}

function validateAddTimeslot(timeslot) {
    if (!timeslot[Fields.TIME_FROM]) {
        return 'time_from is required.';
    } else if (!timeslot[Fields.TIME_TO]) {
        return 'time_to is required.';
    }
    const now = Date.now();
    const beginTime = new Date(timeslot[Fields.TIME_FROM]);
    const endTime = new Date(timeslot[Fields.TIME_TO]);

    if (beginTime < now) {
        return 'time_from should be greater than current time.';
    } else if (beginTime > endTime) {
        return 'time_from shoulde be less than time_to.';
    } else if (endTime - beginTime > 60*60*1000) {
        return 'timeslot should be one hour long.'
    }
    return;
}

function validateBookFriendTimeslot(obj) {
    if (!obj || !obj[Fields.TIMESLOT_ID]) {
        return 'timeslot_id is not provided!';
    }
    return;
}

function validateLoginUser(user) {
    if (!user[Fields.USER_ID]) {
        return 'user_id is required.';
    } else if (!user[Fields.PASSWORD]) {
        return 'password is required.';
    }
    return;
}

function validateRegisterUser(user) {
    if (!user[Fields.NAME]) {
        return 'name is required.';
    } else if (!user[Fields.EMAIL]) {
        return 'email is required.';
    } else if (!user[Fields.PASSWORD]) {
        return 'password is required.';
    }
    return;
}

module.exports = {
    validateAddFriend,
    validateAddTimeslot,
    validateBookFriendTimeslot,
    validateLoginUser,
    validateRegisterUser
};
