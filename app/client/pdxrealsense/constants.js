/*global define*/
define([], function() {
    'use strict';

    return {
        api : {
            token : {
                url : '/api/grasshopper/token'
            },
            logout : {
                url : '/api/grasshopper/token/logout'
            },
            user : {
                url : '/api/grasshopper/user'
            }
        },
        apiKey : 'this_should_be_changed',
        localStorage : {
            key : 'pdxrealsense.authToken'
        },
        internalRoutes : {
            login : '/login',
            logout : '/logout',
            home : '/'
        }
    };
});
