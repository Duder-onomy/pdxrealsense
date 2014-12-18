'use strict';
var express = require('express'),
    grasshopper = require('./grasshopper'),
    version = require('./version');

module.exports = function() {
    var apiRouter = express.Router();

    apiRouter.use(grasshopper());
    apiRouter.use(version());

    return express.Router().use('/api', apiRouter);
};
