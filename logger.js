const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    name: 'TSB',
    streams: [
        {
            level: 'debug',
            stream: process.stdout
        },
        {
            level: 'info',
            type: 'rotating-file',
            path: './log/tsb.json',
            period: '7d',
            count: 2
        }
    ]
});
