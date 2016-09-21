"use strict";

var Backbone = require("backbone/backbone");
var Comment = require("../models/comment.model");

module.exports = Backbone.Collection.extend({
    model: Comment,
    url: "/api/Comments"
});
