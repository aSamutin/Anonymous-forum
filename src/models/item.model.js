"use strict";

var Backbone = require("backbone/backbone");
var _ = require("underscore");

module.exports = Backbone.Model.extend({
    defaults: {
        id: 1,
        sectionId: 0,
        title: ""
    },
    idAttribute: "id",
    url: "/api/Items",
    getComments: function(comments) {
        return _.map(this.get("commentsId"), function(i){ return comments.get(i); });
    }
});
