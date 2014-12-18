/*jshint node:true*/
'use strict';

var ral = require('ral'),
    app = ral('app'),
    BB = require('bluebird'),
    config = ral('config'),
    logger = ral('logger'),
    token;

module.exports = {
    get: get,
    initialize: initialize
};

function initialize() {
    logger.info('Auth Token initializing.');

    return new BB(function(resolve, reject) {
        if (token) {
            resolve(token);
        } else {
            app.grasshopperCore.auth('Basic', {
                username: config.grasshopper.username,
                password: config.grasshopper.password
            })
                .then(function(theToken) {
                logger.info('Auth Token successfully retrieved and cached');
                token = theToken;
                resolve(token);
            })
                .fail(function() {
                logger.error('Auth Token successfully retrieved and cached');
                reject();
            })
                .done();
        }
    });
}

function get() {
    return token;
}
