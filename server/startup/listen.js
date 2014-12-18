'use strict';

var ral = require('ral'),
    app = ral('app'),
    BB = require('bluebird'),
    config = ral('config');

module.exports = listen;

function listen() {
    return new BB(function(resolve) {
        var PORT = process.env.PORT || config.app.port,
            HOST = config.app.host,
            expressApp = app.expressApp,
            logger = ral('logger');

        if (HOST) {
            expressApp.listen(PORT, HOST);
            logger.info('Service listening on host: ' + HOST + ' and port: ' + PORT);
        } else {
            expressApp.listen(PORT);
            logger.info('Service listening on port only: ' + PORT);
        }
        resolve();
    });

}
