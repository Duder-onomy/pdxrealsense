define(['masseuse'], function(masseuse) {
    'use strict';

    var RivetsView = masseuse.plugins.rivets.RivetsView;

    return RivetsView.extend({
        initialize : initialize,
        saveViewModel : saveViewModel,
        loadViewModel : loadViewModel
    });

    function initialize(options) {
        if (options.model) {
            this.dataModel = options.model;
            options.model = this.dataModel.clone();
        }

        RivetsView.prototype.initialize.call(this, options);
    }

    function saveViewModel() {
        if (this.beforeSaveViewModel) {
            this.beforeSaveViewModel();
        }

        this.dataModel.set(this.model.attributes);

        if (this.afterSaveViewModel) {
            this.afterSaveViewModel();
        }
    }

    function loadViewModel() {
        this.model.set(this.dataModel.attributes);
    }
});
