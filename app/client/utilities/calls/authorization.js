define(['jquery', 'constants', 'utilities/localStorage'], function ($, constants, localStorage) {
    'use strict';

    return {
        ensureHeaders : ensureHeaders,
        addApiKeyToHeaders : addApiKeyToHeaders,
        addAuthTokenToHeaders : addAuthTokenToHeaders
    };

    function ensureHeaders(ajaxOptions) {
        ajaxOptions = ajaxOptions || {};
        ajaxOptions.headers = ajaxOptions.headers || {};
        return ajaxOptions;
    }

    function addAuthTokenToHeaders(ajaxOptions) {
        var token = localStorage.get(constants.localStorage.key);

        if (token) {
            ajaxOptions.headers.Authorization = token;
        }

        return ajaxOptions;
    }

    function addApiKeyToHeaders(ajaxOptions) {
        ajaxOptions.headers['x-api-key'] = constants.apiKey;
        return ajaxOptions;
    }

});
