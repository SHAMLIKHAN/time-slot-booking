const mongoClient = require('mongodb').MongoClient;
const config = require('../../config');

async function setupMongoDB() {
    try {
        const client = await mongoClient.connect(config.MONGO_URL, { useUnifiedTopology: true });
        const database = config.MONGO_DB;
        return await client.db(database);
    } catch (err) {
        console.log("Error connecting database!", err);
        return err;
    }
}

module.exports = {
    setupDatabase: setupMongoDB
};
