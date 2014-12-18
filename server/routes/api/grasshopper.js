'use strict';

var ral = require('ral'),
    app = ral('app'),
    express = require('express');

module.exports = function() {
    var grasshopperRouter = express.Router();
    grasshopperRouter.use('/grasshopper', app.grasshopperRouter);
    return grasshopperRouter;
};
