const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

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

app.get('/tsb', (req, res) => {
    res.json({
        message: "Welcome to TSB - Time Slot Booking!"
    });
});

console.log(`Server is listening on port ${config.PORT}`);
app.listen(config.PORT);
