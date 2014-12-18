/*global define:false*/
define(['text!./template.html', './model'], function(template, Model) {
    'use strict';

        return {
            ModelType: Model,
            wrapper : false,
            template : template
        };
});
