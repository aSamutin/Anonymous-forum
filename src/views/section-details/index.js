var Backbone = require("backbone/backbone");
var _ = require("underscore");
var $ = require("jquery/dist/jquery");
var template = require("./index.ejs");
var templPopup = require("./new-item.ejs");
var ItemView = require("./item");
var Sections  = require("../../collections/section.collection");
var Item = require("../../models/item.model");

module.exports = Backbone.View.extend({
    events: {
        "click .item": "navigate",
        "click #addNewItem": "openForm",
        "click #addItem": "addItem",
        "click #back": "back",
        "click .close": "closePopup"
    },
    tagName: "div",
    className: "items-list",
    views: [],
    template: template,
    sectionId: 0,

    initialize: function (section) {
        this.sectionId = section.sectionId;
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "add", this.render);
        var sections = new Sections();
        sections.fetch();
        this.sections = sections;
    },

    render: function () {
        _.invoke(this.views, "destroy");
        this.views = [];
        this.$el.html(this.template({title: this.sections.get(this.sectionId).toJSON().title}));
        _.each(this.collection.models, function (model) {
            if (model.get("sectionId") == this.sectionId) {
                var modelView = new ItemView({
                    model: model
                });
                this.views.push(modelView);
                this.$el.append(modelView.render().$el);
            }
        }, this);
        this.$el.append(templPopup());
    },

    navigate: function (event) {
        var elem = $(event.currentTarget);
        var id = elem.data("id");
        Backbone.history.navigate(`item/${id}`, true);
    },
    openForm: function() {
        $(".blackBackground").toggleClass("hide");
        $("form[name='new-item']").toggleClass("hide");
    },
    addItem: function() {
        var item = new Item({sectionId: this.sectionId,title: $("input[name='titleItem']").val()});
        $(".blackBackground").toggleClass("hide");
        $("form[name='new-item']").toggleClass("hide");
        this.collection.add(item);
        item.save();
    },
    back: function() {
        Backbone.history.navigate("section", true);
    },
    closePopup: function() {
        $(".blackBackground").toggleClass("hide");
        $("form[name='new-item']").toggleClass("hide");
    },
    destroy: function () {
        _.invoke(this.views, "remove");
        this.remove();
    }
});
