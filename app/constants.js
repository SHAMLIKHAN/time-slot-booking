const Collections = {
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
    STATUS: 'status',
    UPDATED_AT: 'updated_at',
    USER_ID: 'user_id'
};

const Keys = {
    SIGN: 'abcdefghijklmnopqrstuwxyz',
    VERIFY: 'abcdefghijklmnopqrstuwxyz'
};

const Status = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
};

module.exports = {
    Cols: Collections,
    Fields,
    Keys,
    Status
};
