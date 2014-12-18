define(['./token', 'utilities/localStorage', 'constants'], function(token, localStorage, constants) {
    'use strict';

    return {
        login : login,
        logout : logout
    };

    function login(username, password) {
        return token.get(username, password)
            .done(function(token) {
                localStorage.set(constants.localStorage.key, token.access_token);
            });
    }

    function logout() {
        return token.invalidate()
            .done(function() {
                localStorage.remove(constants.localStorage.key);
            });
    }

});
