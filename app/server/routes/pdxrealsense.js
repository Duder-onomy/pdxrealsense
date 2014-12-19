'use strict';

var express = require('express'),
    BB = require('bluebird'),
    ral = require('ral'),
    authToken = ral('authToken'),
    logger = ral('logger'),
    app = ral('app');

module.exports = function() {
    var pdxrealsenseRouter = express.Router(),
        webSocket,
        yesVotes = 0,
        noVotes = 0;

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

    pdxrealsenseRouter
        .route('/start/:slug?')
        .get(function(req, res) {
            _getContentBySlug(req.params.slug || 'step1')
                .done(function(data) {
                    if(data['next-step'] === 'done') {
                        res.render('summary');
                    } else {
                        res.render('start', {
                            currentImageName : data.title,
                            currentImageHref : data.image,
                            nextStep : '/start/'+ data['next-step']
                        });
                    }
                });
        });

    app.expressApp
        .ws('/info', function(ws, req) {
            ws.on('message', function(msg) {
                console.log(msg);
            });

            /*setInterval(function() {
                ws.send(JSON.stringify({ message : 'its chill'}));
            }, 5000);*/
        });

    pdxrealsenseRouter
        .route('/vote/:vote')
        .post(function(req, res) {
            if(req.params.vote === 'yes') {
                yesVotes = yesVotes + 1;
            } else {
                noVotes = noVotes + 1;
            }

            app.expressApp
                .ws
                .send(JSON.stringify({ yesVotes : yesVotes, noVotes : noVotes }));
        });

    return pdxrealsenseRouter;
};


function _getContentBySlug(slug) {
    return new BB.Promise(function(resolve, reject) {
        app.grasshopperCore.request(authToken.get())
            .content.queryFull(app.grasshopperCore.utilities.queryBuilder.create()
            .equals('fields.slug', slug)
            .build())
            .then(function(data) {
                resolve(data.results[0].fields);
            })
            .catch(function(error) {
                logger.error(error);
                reject();
            });
    });
}
