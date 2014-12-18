'use strict';

var BB = require('bluebird'),
    listen = require('./listen');

module.exports = {
    initialize: initialize,
    listen: listen
};

function initialize() {
    return BB.resolve()
        .then(require('./solid-logger-js').initialize)
        .then(require('./express').initialize)
        .then(require('./mongoose').initialize)
        .then(require('./grasshopper-api').initialize);
}
