const base = require('./db_conn');
const { Cols, Fields, Status } = require('../constants');

async function addFriendMongoDB(user, friend) {
    try {
        const db = await base.setupDatabase();
        const query = {
            [Fields.ID]: user[Fields.USER_ID]
        };
        const push = {
            [Fields.FRIENDS]: friend[Fields.USER_ID]
        };
        const result = await db.collection(Cols.USERS).find(query).project({[Fields.FRIENDS]: 1, [Fields._ID]: 0}).toArray();
        const friends = result[0][Fields.FRIENDS];
        friends.forEach(id => {
            if (id == friend[Fields.USER_ID]) {
                throw new Error('User is already your friend!');
            }
        });
        const update = await db.collection(Cols.USERS)
            .updateOne(query, { $push: push });
        if (update.matchedCount === 1) {
            return await db.collection(Cols.USERS).findOne(query);
        }
        throw new Error('Error adding friend! Please try with valid user_id!');
    } catch (err) {
        throw err;
    }
}

async function addTimeslotMongoDB(user, timeslot) {
    try {
        const db = await base.setupDatabase();
        const query = {
            [Fields.ID]: timeslot[Fields.ID],
            [Fields.USER_ID]: user[Fields.USER_ID],
            [Fields.TIME_FROM]: timeslot[Fields.TIME_FROM],
            [Fields.TIME_TO]: timeslot[Fields.TIME_TO],
            [Fields.BEGIN_DATE]: timeslot[Fields.BEGIN_DATE],
            [Fields.BEGIN_TIME]: timeslot[Fields.BEGIN_TIME],
            [Fields.END_DATE]: timeslot[Fields.END_DATE],
            [Fields.END_TIME]: timeslot[Fields.END_TIME],
            [Fields.SLOT_NO]: timeslot[Fields.SLOT_NO],
            [Fields.STATUS]: Status.AVAILABLE
        };
        const check = {
            [Fields.USER_ID]: user[Fields.USER_ID],
            [Fields.BEGIN_DATE]: timeslot[Fields.BEGIN_DATE],
            [Fields.BEGIN_TIME]: timeslot[Fields.BEGIN_TIME]
        };
        const exists = await db.collection(Cols.TIMESLOTS).find(check).toArray();
        if (exists.length) {
            throw new Error('timeslot is occupied! Try another timeslot!');
        }
        const result = await db.collection(Cols.TIMESLOTS).insertOne(query);
        return result.ops[0];
    } catch (err) {
        throw err;
    }
}

async function deleteFriendMongoDB(user, friendId) {
    try {
        const db = await base.setupDatabase();
        const query = {
            [Fields.ID]: user[Fields.USER_ID]
        };
        const pull = {
            [Fields.FRIENDS]: friendId
        };
        const update = await db.collection(Cols.USERS).updateOne(query, { $pull: pull });
        if (update.modifiedCount === 1) {
            return;
        }
        throw new Error('Error deleting friend! Please try with valid friend_id!');
    } catch (err) {
        throw err;
    }
}

async function getFreindsMongoDB(user) {
    try {
        const db = await base.setupDatabase();
        const query = {
            [Fields.ID]: user[Fields.USER_ID]
        };
        return await db.collection(Cols.USERS).findOne(query);
    } catch (err) {
        throw err;
    }
}

async function getTimeslotsMongoDB(user) {
    try {
        const db = await base.setupDatabase();
        const query = {
            [Fields.USER_ID]: user[Fields.USER_ID],
            [Fields.TIME_FROM] : {
                $gte: Date.now()
            }
        };
        return await db.collection(Cols.TIMESLOTS).find(query).toArray();
    } catch (err) {
        throw err;
    }
}

async function loginUserMongoDB(user) {
    try {
        const db = await base.setupDatabase();
        const query = {
            [Fields.ID]: user[Fields.USER_ID],
            [Fields.PASSWORD]: user[Fields.PASSWORD]
        };
        const set = {
            [Fields.STATUS]: Status.ACTIVE,
            [Fields.UPDATED_AT]: (new Date()).getTime()
        };
        const update = await db.collection(Cols.USERS)
            .updateOne(query, { $set: set });
        if (update.matchedCount === 1) {
            return await db.collection(Cols.USERS).findOne(query);
        }
        throw new Error('Authentication failed! Invalid User Id or Password!');
    } catch (err) {
        throw err;
    }
}

async function logoutUserMongoDB(user) {
    try {
        const db = await base.setupDatabase();
        const query = {
            [Fields.ID]: user[Fields.USER_ID],
            [Fields.STATUS]: Status.ACTIVE
        };
        const set = {
            [Fields.STATUS]: Status.INACTIVE,
            [Fields.UPDATED_AT]: (new Date()).getTime()
        };
        const update = await db.collection(Cols.USERS)
            .updateOne(query, { $set: set });
            console.log(query, update.matchedCount)
        if (update.matchedCount === 1) {
            return await db.collection(Cols.USERS).findOne(query);
        }
        throw new Error('Authentication failed! User already logged out!');
    } catch (err) {
        throw err;
    }
}

async function registerUserMongoDB(user) {
    const db = await base.setupDatabase();
    const query = {
        [Fields.EMAIL]: user[Fields.EMAIL]
    };
    const exist = await db.collection(Cols.USERS).find(query).toArray();
    if (exist.length) {
        throw new Error('email already exists!');
    }
    const result = await db.collection(Cols.USERS).insertOne(user);
    return result.ops[0];
}

module.exports = {
    addFriend: addFriendMongoDB,
    addTimeslot: addTimeslotMongoDB,
    deleteFriend: deleteFriendMongoDB,
    getFreinds: getFreindsMongoDB,
    getTimeslots: getTimeslotsMongoDB,
    login: loginUserMongoDB,
    logout: logoutUserMongoDB,
    register: registerUserMongoDB
};
