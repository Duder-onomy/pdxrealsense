define(['jquery', 'underscore'], function ($, _) {
    'use strict';

    var _localStorage = window.localStorage,
        _existenceCheckInterval = 10;

    /**
     * A simple wrapper for local storage.
     */
    return {
        get : get,
        set : set,
        remove : remove
    };

    function get (name) {
        var value = _localStorage.getItem(name);
        if (0 === (value && value.indexOf('{'))) {
            value = JSON.parse(value);
        }
        return value;
    }

    function set (name, value) {
        if (!_.isString(value)) {
            value = JSON.stringify(value);
        }
        return _localStorage.setItem(name, value);
    }

    /**
     * Will remove the item from local storage, and return a promise that is resolved when the item can no longer be
     * seen in LocalStorage
     * @param name
     * @returns {promise}
     */
    function remove (name) {
        var $deferred = new $.Deferred();

        _localStorage.removeItem(name);

        _checkForExistence(name, $deferred);

        return $deferred.promise();
    }

    function _checkForExistence (name, $deferred) {
        if (null === _localStorage.getItem(name)) {
            $deferred.resolve();
        } else {
            setTimeout(function () {
                _checkForExistence(name, $deferred);
            }, _existenceCheckInterval);
        }
    }
});
