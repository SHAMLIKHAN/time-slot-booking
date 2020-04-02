const Collections = {
    TIMESLOTS: 'timeslots',
    USERS: 'users'
};

const Fields = {
    _ID: '_id',
    EMAIL: 'email',
    FRIEND_ID: 'friend_id',
    FRIENDS: 'friends',
    ID: 'id',
    NAME: 'name',
    PASSWORD: 'password',
    SLOT_NO: 'slot_no',
    STATUS: 'status',
    TIME_FROM: 'time_from',
    TIME_TO: 'time_to',
    UPDATED_AT: 'updated_at',
    USER_ID: 'user_id'
};

const Keys = {
    SIGN: 'abcdefghijklmnopqrstuwxyz',
    VERIFY: 'abcdefghijklmnopqrstuwxyz'
};

const Status = {
    AVAILABLE: 'available',
    ACTIVE: 'active',
    BOOKED: 'booked',
    INACTIVE: 'inactive'
};

module.exports = {
    Cols: Collections,
    Fields,
    Keys,
    Status
};
