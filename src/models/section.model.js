var Backbone = require("backbone/backbone");
var _ = require("underscore");

module.exports = Backbone.Model.extend({
    defaults: {
        title: "",
        description: ""
    },
    idAttribute: "id",
    url: "/api/Sections",
    getItems: function(items) {
        return _.map(this.get("itemsId"), function(i){ return items.get(i); });
    }
});
