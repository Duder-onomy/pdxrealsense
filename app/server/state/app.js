'use strict';

var express = require('express');

module.exports = {
    expressApp: express(),
    grasshopperCore: null,
    grasshopperRouter: null,
    mongooseConnection: null
};
