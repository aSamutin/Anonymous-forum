var Backbone = require("backbone/backbone");

module.exports = Backbone.Router.extend({
    routes: {
        "*path": "redirectRoute"
    },

    redirectRoute: function () {
        this.navigate("section", {trigger: true});
    }
});
