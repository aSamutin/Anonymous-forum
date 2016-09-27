var Backbone = require("backbone/backbone");
var _ = require("underscore");
var $ = require("jquery/dist/jquery");
var config = require("../../app.config");
var template = require("./index.ejs");

module.exports = Backbone.View.extend({
    el: "#header",
    tagName: "div",
    className: "header clearfix",
    template: template,
    events: {
        "click #entry": "entry",
        "click #exit": "exit",
    },

    initialize: function () {
        this.$el.html(this.template({config: config.auth}));
    },

    render: function () {
        this.$el.html(this.template({config: config.auth}));
    },
    entry: function () {
        config.auth = true;
        this.render();
        Backbone.history.navigate("/",true);
    },
    exit: function () {
        config.auth = false;
        this.render();
        Backbone.history.navigate("/",true);
    }
});
