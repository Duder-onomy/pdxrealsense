define(['masseuse', './options', 'constants', 'backbone'], function(masseuse, options, constants, backbone) {
    'use strict';

    return masseuse.plugins.rivets.RivetsView.extend({
        defaultOptions : options,
        goToLogin : goToLogin,
        goToLogout : goToLogout
    });

    function goToLogin() {
        backbone.history.navigate(constants.internalRoutes.login, { trigger : true });
    }

    function goToLogout() {
        backbone.history.navigate(constants.internalRoutes.logout, { trigger : true });
    }

});
