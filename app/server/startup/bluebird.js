'use strict';

var BB = require('bluebird');

module.exports = {
    initialize: initialize
};

function initialize() {
    BB.longStackTraces();
}
