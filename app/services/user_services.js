const base = require('./db_conn');
const { Cols, Fields } = require('../constants');

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
    register: registerUserMongoDB
};
