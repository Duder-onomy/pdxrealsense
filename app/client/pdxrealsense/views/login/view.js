/*global define:false*/
define(['masseuse', './options', 'api/auth', 'resources', 'backbone', 'constants'], function(masseuse, options, auth, resources, backbone, constants) {
    'use strict';

    return masseuse.plugins.rivets.RivetsView.extend({
        defaultOptions : options,
        doLogin : doLogin
    });

    function doLogin() {
        auth.login(this.model.get('username'), this.model.get('password'))
            .done(_navigateHome)
            .fail(function(error) {
                console.log(error);
                alert(resources.api.login.errors[error.status]);
            });
    }

    function _navigateHome() {
        backbone.history.navigate(constants.internalRoutes.home, { trigger : true });
    }

});
