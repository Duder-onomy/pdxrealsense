'use strict';

var ral = require('ral'),
    app = ral('app'),
    bodyParser = require('body-parser'),
    bridgetown = require('bridgetown-api'),
    compression = require('compression'),
    config = ral('config'),
    cors = require('cors'),
    dir = __dirname,
    express = require('express'),
    logger = ral('logger'),
    path = require('path'),
    clientDir = path.join(dir, '..', '..', 'client'),
    viewsDir = path.join(dir, '..', 'views');

module.exports = {
    initialize: initialize
};

function initialize() {

    var expressApp = app.expressApp;

    if (!config.app.debug) {
        expressApp.use(compression());
        expressApp.enable('etag');
        expressApp.use(function (req, res, next) {
            res.setHeader('Cache-Control', 'private');
            next();
        });
    } else {
        logger.warn('DEBUG MODE: ETAG AND COMPRESSION OFF');
    }

    expressApp.engine('jade', require('jade').__express);
    expressApp.set('view engine', 'jade');
    expressApp.set('views', viewsDir);
    expressApp.set('view options', {layout: true});
    expressApp.use(express.static(clientDir));

    expressApp.use(bridgetown.middleware.initialize());
    expressApp.use(cors());
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: false}));
}
