const Collections = {
    TIMESLOTS: 'timeslots',
    USERS: 'users'
};

const Fields = {
    _ID: '_id',
    BEGIN_DATE: 'begin_date',
    BEGIN_TIME: 'begin_time',
    DATE: 'date',
    END_DATE: 'end_date',
    END_TIME: 'end_time',
    EMAIL: 'email',
    FRIEND_ID: 'friend_id',
    FRIENDS: 'friends',
    ID: 'id',
    NAME: 'name',
    PASSWORD: 'password',
    SLOT_NO: 'slot_no',
    STATUS: 'status',
    TIME: 'time',
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
