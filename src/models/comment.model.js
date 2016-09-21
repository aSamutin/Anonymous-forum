"use strict";

var Backbone = require("backbone/backbone");

module.exports = Backbone.Model.extend({
    defaults: {
        id: 1,
        itemId: 0,
        username: "Anonim",
        date: new Date(),
        text: ""
    },
    idAttribute: "id",
    url: "/api/Comments"
});
