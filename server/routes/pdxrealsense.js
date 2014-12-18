'use strict';

var express = require('express'),
    ral = require('ral'),
    app = ral('app');

module.exports = function() {
    var pdxrealsenseRouter = express.Router();

    pdxrealsenseRouter
        .route('/pdxrealsense*?')
        .get(function(req, res) {
            res.render('pdxrealsense');
        });

    pdxrealsenseRouter
        .route('/summary')
        .get(function(req, res) {
            res.render('summary');
        });

    app.expressApp
        .ws('/info', function(ws, req) {
            ws.on('message', function(msg) {
                console.log(msg);
            });

            setInterval(function() {
                ws.send(JSON.stringify({ message : 'its chill'}));
            }, 5000);
        });

    return pdxrealsenseRouter;
};
