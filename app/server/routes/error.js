'use strict';

var express = require('express');

module.exports = function() {
    var errorRouter = express.Router();

    errorRouter
        .route('*')
        .get(function(req, res) {
            res.render('404');
        });

    return errorRouter;
};
