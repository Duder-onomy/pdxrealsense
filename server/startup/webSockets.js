
'use strict';

var ral = require('ral'),
    app = ral('app'),
    BB = require('bluebird'),
    logger = ral('logger'),
    expressWs = require('express-ws');

module.exports = {
    initialize: initialize
};

function initialize() {
    return new BB.Promise(function(resolve) {
        expressWs(app.expressApp);

        logger.info('!!!!!!!WEB SOCKETS INITIALIZED!!!!!!!');

        resolve();
    });
}
