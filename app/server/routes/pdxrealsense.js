'use strict';

var express = require('express');

module.exports = function() {
    var pdxrealsenseRouter = express.Router();

    pdxrealsenseRouter
        .route('/pdxrealsense*?')
        .get(function(req, res) {
            res.render('pdxrealsense');
        });

    return pdxrealsenseRouter;
};
