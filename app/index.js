'use strict';

require('ral').basePath = __dirname;

var ral = require('ral'),
    config = ral('config'),
    logger = ral('logger'),
    notifyParent = ral('startup/notifyParent'),
    routes = ral('routes'),
    startup = ral('startup');

config
    .initialize()
    .then(startup.initialize)
    .then(routes.initialize)
    .then(startup.listen)
    .then(notifyParent.success)
    .catch(function(error) {
        logger.error('STARTUP FAILURE - STOPPING');
        logger.error(error);
        logger
            .getWhenCurrentWritesDone()
            .then(notifyParent.failure);
    });
