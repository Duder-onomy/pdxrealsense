define(['jquery', 'base64', 'constants', 'utilities/localStorage'],
    function ($, base64, constants, localStorage) {
        'use strict';

        return {
            get: get,
            invalidate: invalidate
        };

        function get(username, password) {
            return $.ajax({
                dataType: 'json',
                url: constants.api.token.url,
                type: 'GET',
                headers: {
                    'Authorization': base64.encode(username + ':' + password)
                }
            });
        }

        function invalidate() {
            var token = localStorage.get(constants.localStorage.key);

            return $.ajax({
                dataType: 'json',
                url: constants.api.logout.url,
                type: 'GET',
                headers: {'Authorization': token}
            });
        }

    });
