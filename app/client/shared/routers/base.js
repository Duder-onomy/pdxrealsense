define(['jquery', 'utilities/loadView', 'masseuse', 'shared/models/user', 'constants', 'utilities/localStorage'],
    function ($, loadView, masseuse, userModel, constants, localStorage) {
        'use strict';

        var MasseuseRouter = masseuse.MasseuseRouter;

        return MasseuseRouter.extend({
            authorizeUser: authorizeUser,
            beforeRouting: beforeRouting,
            loadView: loadView,
            onRouteFail: onRouteFail
        });

        function authorizeUser() {
            var $deferred = $.Deferred();

            if (userModel.get('loggedIn')) {
                $deferred.resolve();
            } else {
                userModel
                    .fetch()
                    .done(function () {
                        userModel.set('loggedIn', true);
                        $deferred.resolve();
                    })
                    .fail(function () {
                        userModel.set('loggedIn', false);
                        $deferred.reject();
                    });
            }

            return $deferred.promise();
        }

        function beforeRouting() {
            var $deferred = $.Deferred();

            if (userModel.get('loggedIn')) {
                $deferred.resolve();
            } else {
                this.authorizeUser()
                    .done($deferred.resolve)
                    .fail($deferred.reject);
            }

            return $deferred.promise();
        }

        function onRouteFail() {
            localStorage.remove(constants.localStorage.key);
            this.navigate(constants.internalRoutes.login, {trigger: true});
        }
    });
