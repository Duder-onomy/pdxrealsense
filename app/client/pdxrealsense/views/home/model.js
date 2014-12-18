define(['masseuse', 'shared/models/user'], function(masseuse, userModel) {
    'use strict';

    return masseuse.Model.extend({
        defaults : {
            userModel : userModel
        }
    });

});
