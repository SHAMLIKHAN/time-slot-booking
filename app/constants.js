const Collections = {
    TIMESLOTS: 'timeslots',
    USERS: 'users'
};

const Environments = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    STAGING: 'staging'
};

const Fields = {
    _ID: '_id',
    BEGIN_DATE: 'begin_date',
    BEGIN_TIME: 'begin_time',
    BOOKED_BY: 'booked_by',
    DATE: 'date',
    END_DATE: 'end_date',
    END_TIME: 'end_time',
    EMAIL: 'email',
    FRIEND_ID: 'friend_id',
    FRIENDS: 'friends',
    ID: 'id',
    LOGIN_STATUS: 'login_status',
    NAME: 'name',
    PASSWORD: 'password',
    SLOT_NO: 'slot_no',
    STATUS: 'status',
    TIME: 'time',
    TIME_FROM: 'time_from',
    TIME_TO: 'time_to',
    TIMESLOT_ID: 'timeslot_id',
    TOKEN: 'token',
    UNKNOWN: 'unknown',
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
    Env: Environments,
    Fields,
    Keys,
    Status
};
