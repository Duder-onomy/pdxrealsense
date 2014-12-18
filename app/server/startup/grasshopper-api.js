'use strict';

var ral = require('ral'),
    app = ral('app'),
    BB = require('bluebird'),
    config = ral('config'),
    ghapi = require('grasshopper-api'),
    logger = ral('logger');

module.exports = {
    initialize: initialize
};

function initialize() {
    return new BB.Promise(function(resolve) {
        var returnedComponents = ghapi(config.ghapi);

        app.grasshopperCore = returnedComponents.core;
        app.grasshopperRouter = returnedComponents.router;

        app.grasshopperCore.event.channel( '/system/db' ).on( 'start', function(payload, next) {
            logger.debug('GH started');
            next();
            resolve();
        });
    });
}
