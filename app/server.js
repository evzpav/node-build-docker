const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '500kb' }));
app.use(bodyParser.json({ limit: '500kb' }));

require('./router/router')(app);

const connectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
};

let mongoUrl = config.mongo_url + config.mongo_option;
console.info('Connecting at mongo ' + mongoUrl);

mongoose.connect(mongoUrl, connectionOptions).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.info('Mongoose default connection open to ' + mongoUrl);
        app.emit('mongoConnected');
    },
    err => {
        /** handle initial connection error */
        console.error('Mongoose err while connecting: ' + err);
    }
);

const server = app.listen(config.port, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.info('App listening on port ' + config.port);
});

function stop () {
    server.close(() => {
        console.info('Server closed');
        process.exit();
    });
}

process.on('SIGINT', () => {
    console.info('Closing server...');

    stop();

    // Force close server after 5 secs
    setTimeout((e) => {
        console.warn('Forcing server close', e);
        process.exit(1);
    }, 5001);
});

module.exports = app;
module.exports.stop = stop;
