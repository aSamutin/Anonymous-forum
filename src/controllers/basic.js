var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
    model: null,
    view: null,
    destroy: function () {
        if (this.view) {
            this.view.remove();
        }
    }
});
