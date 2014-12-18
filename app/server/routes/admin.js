'use strict';

var express = require('express'),
    path = require('path');

module.exports = function() {
    var adminRouter = express.Router();

    adminRouter
        .route('/admin*?')
        .get(function(req, res) {
            res.sendFile('/client/admin/index.html', {'root' : path.join(__dirname, '..', '..') });
        });

    return adminRouter;
};
