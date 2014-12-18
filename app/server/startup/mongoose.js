'use strict';

var _ = require('lodash'),
    ral = require('ral'),
    app = ral('app'),
    BB = require('bluebird'),
    constants = ral('constants'),
    dbConfigs = ral('config').mongo,
    endpoint = 'mongodb://' + dbConfigs.host + ':' + dbConfigs.port + '/' + dbConfigs.database,
    logger = ral('logger'),
    mongoose = BB.promisifyAll(require('mongoose')),
    options = {
        server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } },
        user: dbConfigs.username,
        pass: dbConfigs.password
    },
    promise = {
        resolve: null,
        reject: null
    };

module.exports = {
    initialize : initialize
};

function initialize() {
    return new BB(function(resolve, reject) {
        promise.resolve = resolve;
        promise.reject = reject;
        app.mongooseConnection = mongoose.createConnection(endpoint, options);
        startListening();
    });
}

function startListening() {
    app.mongooseConnection.on('connected', function () {
        logger.info('Database is connected');
        BB.promisifyAll(app.mongooseConnection.db);
        app
            .mongooseConnection.db
            .collectionNamesAsync({
                namesOnly: true
            })
            .then(function(collections) {
                var allThere = _.every(constants.mongo.requiredCollections, function(collection) {
                    return _.contains(collections, dbConfigs.database + '.' + collection);
                });

                logger.info('required collections:');
                logger.info(constants.mongo.requiredCollections);

                logger.info('available collections:');
                logger.info(collections);

                if (!allThere) {
                    throw new Error(
                        'Not all needed collections are present.\n' +
                        'Please run grunt data:load. ');
                }
            })
            .then(promise.resolve)
            .catch(promise.reject);
    });

// If the connection throws an error
    app.mongooseConnection.on('error',function (err) {
        logger.debug(mongoose.connection.readyState);
        logger.error(err);
        promise.reject(err);
    });

// When the connection is disconnected
    app.mongooseConnection.on('disconnected', function () {
        logger.info('Database is disconnected');
    });

// If the Node process ends, close the Mongoose connection
    process.on('SIGINT',  closeMongoose);
    process.on('SIGTERM', closeMongoose);
}

function closeMongoose() {
    app.mongooseConnection.close(function () {
        logger.info('Database is disconnected');
        process.exit(0);
    });
}
