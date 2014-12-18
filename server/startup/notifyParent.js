'use strict';

var logger = require('ral')('logger');

module.exports = {
    success: success,
    failure: failure
};

function success() {
    process.send && process.send({
        state: 'listening',
        pid: process.pid
    });
    logger.info('success: parent notified');
}

function failure() {
   process.exit(1);
}