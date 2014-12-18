define([ 'shared/routers/base', 'views/home/view'],
    function (BaseRouter, HomeView) {
    'use strict';

    return BaseRouter.extend({
        routes: {
            '': 'showHome'
        },
        showHome : showHome
    });

    function showHome() {
        this.loadView('#stage', HomeView);
    }
});
