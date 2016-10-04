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
    },

    render: function () {
        var that = this;
        var sections = new Sections();
        sections.fetch().then(function(){
            that.sections = sections;
            _.invoke(that.views, "destroy");
            that.views = [];
            that.$el.html(that.template({title: that.sections.get(that.sectionId).toJSON().title}));
            _.each(that.collection.models, function (model) {
                if (model.get("sectionId") == that.sectionId) {
                    var modelView = new ItemView({
                        model: model
                    });
                    that.views.push(modelView);
                    that.$el.append(modelView.render().$el);
                }
            }, that);
            that.$el.append(templPopup());
        });
    },

    navigate: function (event) {
        var elem = $(event.currentTarget);
        var id = elem.data("id");
        Backbone.history.navigate(`item/${id}`, true);
    },
    openForm: function() {
        this.$(".blackBackground").toggleClass("hide");
        this.$("form[name='new-item']").toggleClass("hide");
    },
    addItem: function() {
        var item = new Item({sectionId: this.sectionId, title: this.$("input[name='titleItem']").val()});
        this.$(".blackBackground").toggleClass("hide");
        this.$("form[name='new-item']").toggleClass("hide");
        this.collection.add(item);
        item.save();
    },
    back: function() {
        Backbone.history.navigate("section", true);
    },
    closePopup: function() {
        this.$(".blackBackground").toggleClass("hide");
        this.$("form[name='new-item']").toggleClass("hide");
    },
    destroy: function () {
        _.invoke(this.views, "remove");
        this.remove();
    }
});
