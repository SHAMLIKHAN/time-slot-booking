const host = process.env.DEVELOPMENT_MONGODB_HOST;
const user = process.env.DEVELOPMENT_MONGODB_USERNAME;
const pass = process.env.DEVELOPMENT_MONGODB_PASSWORD;
const port = process.env.DEVELOPMENT_MONGODB_PORT;
const auth = process.env.DEVELOPMENT_MONGODB_AUTH_SOURCE;
const db = process.env.DEVELOPMENT_MONGODB_DATABASE;

const app = process.env.PORT || 8080;
const mongoURI = `mongodb://${host}:${port}/${db}`;
const mongoDB = db;

module.exports = {
	MONGO_URL: mongoURI,
	MONGO_DB: mongoDB,
	PORT: app
};
