/*global define:false*/
define(['text!./template.html', './model', './formatters', 'resources'], function(template, model, formatters, resources) {
    'use strict';

    return {
        ModelType : model,
        appendTo : '#stage',
        wrapper : false,
        template : template,
        rivetsConfig : {
            formatters : formatters,
            bindings : {
                resources : resources
            }
        }
    };
});
