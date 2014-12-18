define(['jquery', 'utilities/localStorage', 'shared/routers/base', 'backbone' , 'views/login/view', 'constants', 'shared/models/user'],
    function ($, localStorage, BaseRouter, backbone, LoginView, constants, user) {
        'use strict';

        return BaseRouter.extend({
            excludeFromBeforeRouting: ['login(/)', 'logout(/)'],
            routes: {
                'login(/)' : 'showLogin',
                'logout(/)' : 'logout'
            },
            logout : logout,
            showLogin : showLogin
        });

        function showLogin() {
            if (localStorage.get(constants.localStorage.key)) {
                backbone.history.navigate(constants.internalRoutes.home, {trigger: true});
            } else {
                this.loadView('#stage', LoginView);
            }
        }

        function logout() {
            user
                .logout()
                .always(_redirectToLogin);
        }

        function _redirectToLogin() {
            backbone.history.navigate(constants.internalRoutes.login, {trigger: true});
        }
    });
