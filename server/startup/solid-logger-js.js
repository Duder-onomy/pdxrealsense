'use strict';

var ral = require('ral'),
    config = ral('config'),
    logger = ral('logger');

module.exports = {
    initialize: initialize
};

function initialize() {
    logger.init(config.logger);
    logger.info(
        "\n __ _             _                      \n" + // jshint ignore:line
        "/ _\\ |_ __ _ _ __| |_ _   _ _ __        \n" + // jshint ignore:line
        "\\ \\| __/ _` | '__| __| | | | '_ \\        \n" + // jshint ignore:line
        "_\\ \\ || (_| | |  | |_| |_| | |_) |       \n" + // jshint ignore:line
        "\\__/\\__\\__,_|_|   \\__|\\__,_| .__/        \n" + // jshint ignore:line
        "                           |_|           \n" // jshint ignore:line
    );
    logger.info('Logger initialized.');
}
