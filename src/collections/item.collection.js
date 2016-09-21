"use strict";

var Backbone = require("backbone/backbone");
var Item = require("../models/item.model");

module.exports = Backbone.Collection.extend({
    model: Item,
    url: "/api/Items"
});
