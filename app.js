const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./logger');

const userRouter = require('./app/routes/user_router');
const memberRouter = require('./app/routes/member_router');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
      'origin, content-type, accept, authorization');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/tsb/user', userRouter);
app.use('/tsb/members', memberRouter);

logger.info(`TSB: Server is listening on port ${config.PORT}!`);
app.listen(config.PORT);
