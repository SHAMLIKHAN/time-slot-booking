const base = require('./db_conn');
const { Cols, Fields, Status } = require('../constants');

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
    login: loginUserMongoDB,
    logout: logoutUserMongoDB,
    register: registerUserMongoDB
};
