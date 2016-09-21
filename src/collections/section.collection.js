"use strict";

var Backbone = require("backbone/backbone");
var Section = require("../models/section.model");

module.exports = Backbone.Collection.extend({
    model: Section,
    url: "/api/Sections"
});
