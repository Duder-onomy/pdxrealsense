define(['text!./template.html', './model', 'resources'], function(template, model, resources) {
    'use strict';

        return {
            ModelType : model,
            wrapper : false,
            template : template,
            rivetsConfig : {
                bindings : {
                    resources : resources
                }
            }
        };
});
