var Backbone = require("backbone/backbone");
var _ = require("underscore");
var $ = require("jquery/dist/jquery");

var SectionView = require("./section");
var template = require("./index.ejs");
var templPopup = require("./new-section.ejs");
var Section = require("../../models/section.model");

module.exports = Backbone.View.extend({
    events: {
        "click .section": "navigate",
        "click #addNewSection": "openForm",
        "click #addSection": "addSection",
    },
    tagName: "div",
    className: "sections-list",
    views: [],
    template: template,

    initialize: function () {
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "add", this.render);
    },

    render: function () {
        _.invoke(this.views, "destroy");
        this.views = [];
        this.$el.html(this.template());
        _.each(this.collection.models, function (model) {
            var modelView = new SectionView({
                model: model
            });
            this.views.push(modelView);
            this.$el.append(modelView.render().$el);
        }, this);
        this.$el.append(templPopup());
    },

    navigate: function (event) {
        var elem = $(event.currentTarget);
        var id = elem.data("id");
        Backbone.history.navigate(`section/${id}`, true);
    },
    openForm: function() {
        $(".blackBackground").toggleClass("hide");
        $("form[name='new-section']").toggleClass("hide");
    },
    addSection: function() {
        var section = new Section({id: Math.round(Math.random()*1000),title: $("input[name='titleItem']").val(),
        description: $("textarea").val()});
        Backbone.sync("create",section);
        $(".blackBackground").toggleClass("hide");
        $("form[name='new-section']").toggleClass("hide");
        this.collection.add(section);
    },

    destroy: function () {
        _.invoke(this.views, "remove");
        this.remove();
    }
});
