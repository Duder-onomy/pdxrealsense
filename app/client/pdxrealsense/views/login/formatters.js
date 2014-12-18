define(function () {
    'use strict';

    return {
        preventDefault : preventDefault
    };

    function preventDefault(method) {
        return function(event) {
            event.preventDefault();
            method.call(this, event);
            return false;
        };
    }
    });
