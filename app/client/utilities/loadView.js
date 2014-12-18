define(['jquery', 'underscore'], function ($, _) {
    'use strict';

    var currentViews = {};

    return loadView;

    function loadView(appendTo, ViewType, options) {
        var $deferred = new $.Deferred(),
            newView;

        options = _.extend({
            appendTo: appendTo
        }, options);

        newView = new ViewType(options);

        if (currentViews[appendTo]) {
            currentViews[appendTo].remove();
        }

        currentViews[appendTo] = newView;

        newView.start()
            .done(function () {
                currentViews[appendTo] = newView;
                $deferred.resolve(newView);
            })
            .fail($deferred.reject);

        return $deferred.promise();
    }
});
