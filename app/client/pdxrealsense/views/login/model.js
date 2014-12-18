define(['masseuse'], function(masseuse) {
    'use strict';

    return masseuse.Model.extend({
        defaults : {
            username : null,
            password : null
        }
    });

});
