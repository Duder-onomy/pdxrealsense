'use strict';

var path = require('path');

module.exports = function(config) {
    config.grasshopper.assets.engines.local.path = path.join(__dirname, '..', '..', config.grasshopper.assets.engines.local.path);

    config.ghapi = {
        'server' : {
            'proxy' : true
        },
        'cache': {
            'path': './cache'
        },
        'crypto': {
            'secret_passphrase' : config.app.uuid
        },
        'db': {
            'type' : 'mongodb',
            'host' : 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database,
            'database' : config.mongo.database,
            'requestLogs' : false,
            'username' : config.mongo.username,
            'password' : config.mongo.password,
            'debug' : config.grasshopper.debug
    },
        'assets': config.grasshopper.assets,
        'logger' : config.grasshopper.logger
    };
};
