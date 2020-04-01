const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./logger');

const userRouter = require('./app/routes/user_router.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
      'origin, content-type, accept, authorization');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/tsb/user', userRouter);

logger.info(`TSB: Server is listening on port ${config.PORT}!`);
app.listen(config.PORT);
