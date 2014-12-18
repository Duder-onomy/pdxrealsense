'use strict';

var ral = require('ral'),
    express = require('express'),
    pkg = ral('pkg');

module.exports = function() {
    var versionRouter = express.Router();

    versionRouter
        .route('/version')
        .get(function(req, res) {
            res.send({
                version: pkg.version
            });
        });

    return versionRouter;
};
