/* jshint onevar: false */
define(['backbone', 'jquery', 'constants', './authorization'], function (Backbone, $, constants, authorization) {
    'use strict';

    var oldSync = Backbone.sync;

    return function () {
        Backbone.sync = sync;

        return {
            sync: sync
        };
    };

    function sync(method, model, options) {
        options = authorization.ensureHeaders(options);
        options = authorization.addApiKeyToHeaders(options);
        options = authorization.addAuthTokenToHeaders(options);

        return oldSync.call(this, method, model, options);
    }
});
