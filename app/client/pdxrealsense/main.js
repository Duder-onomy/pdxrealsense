require.config({
    shim: {
        base64: {
            exports: 'Base64'
        },
        sightglass : {
            exports : 'sightglass'
        },
        rivets : {
            deps: ['sightglass'],
            exports: 'rivets'
        }
    },
    packages: [
        {
            name: 'underscore',
            location: '../vendor/lodash-amd/underscore'
        },
        {
            name: 'masseuse',
            location: '../vendor/masseuse/app'
        }
    ],
    paths: {
        api: './api',
        backbone: '../vendor/backbone-amd/backbone',
        base64: '../vendor/js-base64/base64',
        constants: './constants',
        jquery: '../vendor/jquery/dist/jquery',
        resources: './resources',
        shared: '../shared',
        sightglass: '../vendor/sightglass/index',
        rivets: '../vendor/rivets/dist/rivets',
        routers: './routers',
        text: '../vendor/requirejs-text/text',
        utilities: '../utilities',
        views: './views'
    }
});

require(['backbone', 'masseuse', 'jquery', 'routers/pdxrealsense', 'routers/authorization', 'utilities/calls/customizeSync', 'views/navigation/view'],
    function (Backbone, masseuse, $, pdxrealsenseRouter, AuthorizationRouter, customizeSync, NavigationView) {
        'use strict';

        new AuthorizationRouter();
        new pdxrealsenseRouter();

        customizeSync();

        setupPushState();

        Backbone.history.start({
            hashChange: false,
            pushState: true,
            root: '/pdxrealsense'
        });

        new NavigationView({
            appendTo:'#header'
        }).start();

        //router.loadView('#header', NavigationView);
        function setupPushState() {
            $(document).on('click', 'a[href^="/"]', navigate);
        }

        function navigate(event) {
            var $a,
                url;

            if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                $a = $(event.currentTarget);

                if (!$a.attr('target') && !$a.hasClass('noPushState')) {
                    event.preventDefault();
                    url = $a.attr('href').replace(/^\//, '');
                    Backbone.history.navigate(url, {trigger: true});
                }
            }
        }
    });
