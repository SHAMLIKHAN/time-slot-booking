const mongoClient = require('mongodb').MongoClient;
const config = require('../../config');
const { Env } = require('../constants');

function getDatabaseName(URL) {
    if (config.ENV == Env.DEVELOPMENT) {
        return URL;
    }
    const array = URL.split('/');
    if (array.length > 1) {
        return array[array.length - 1];
    }
    return URL;
}

async function setupMongoDB() {
    try {
        const client = await mongoClient.connect(config.MONGO_URL, { useUnifiedTopology: true });
        const database = getDatabaseName(config.MONGO_DB);
        return await client.db(database);
    } catch (err) {
        console.log("Error connecting database!", err);
        return err;
    }
}

module.exports = {
    setupDatabase: setupMongoDB
};
