define(['masseuse', 'constants', 'api/auth'], function (masseuse, constants, auth) {
    'use strict';

    var UserModel = masseuse.Model.extend({
            url: constants.api.user.url,
            defaults: defaults,
            logout: logout
        });

    return new UserModel();

    function defaults() {
        return {
            loggedIn : false
        };
    }

    function logout() {
        var self = this;
        return auth
            .logout()
            .done(function() {
                self.set('loggedIn', false);
            });
    }
});
