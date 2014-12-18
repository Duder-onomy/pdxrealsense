/*jshint node:true */
'use strict';

var authenticate = require('ral')('util/authenticate'),
    error = require('ral')('error'),
    bridgetown = require('bridgetown-api');

module.exports = {
    apiKey : bridgetown.middleware.apiKey(_validateApiKey),
    authorization : bridgetown.middleware.authorization(_validateToken),
    password: bridgetown.middleware.authorization(_validatePassword)
};

function _validatePassword(token, deferred) {
    authenticate.authenticate(token.method, token.token)
        .then(deferred.resolve)
        .catch(function (whoops) {
            var failure = error.errors.unauthorizedToken(),
                code = (whoops && whoops.code) || failure.code,
                message = (whoops && whoops.message) || failure.message;

            deferred.reject({
                code: code,
                message: message
            });
        });
}

function _validateToken(token, deferred) {

    authenticate.validateToken(token)
        .then(deferred.resolve)
        .catch(function () {
            deferred.reject({
                code: 403,
                message: 'Invalid Auth token'
            });
        });
}

function _validateApiKey(apiKey, deferred) {

    authenticate.validateApiKey(apiKey)
        .then(deferred.resolve)
        .catch(function () {
            deferred.reject({
                code: 403,
                message: 'Invalid API key'
            });
        });

}
