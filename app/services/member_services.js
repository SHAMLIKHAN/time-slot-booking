const base = require('./db_conn');
const { Cols, Fields, Status } = require('../constants');

async function getMembersMongoDB() {
    const db = await base.setupDatabase();
    const members = await db.collection(Cols.USERS).find({})
        .project({[Fields.ID]: 1, [Fields.NAME]: 1, [Fields.EMAIL]: 1, [Fields._ID]: 0}).toArray();
    return members;
}

module.exports = {
    getMembers: getMembersMongoDB
};
