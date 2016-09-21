"use strict";

var Backbone = require("backbone/backbone");
var _ = require("underscore");

module.exports = Backbone.Model.extend({
    defaults: {
        id: 1,
        title: "",
        description: ""
    },
    idAttribute: "id",
    url: "/api/Sections",
    getItems: function(items) {
        return _.map(this.get("itemsId"), function(i){ return items.get(i); });
    }
});
