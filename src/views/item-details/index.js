var Backbone = require("backbone/backbone");
var _ = require("underscore");
var $ = require("jquery/dist/jquery");
var template = require("./index.ejs");
var templPopup = require("./new-comment.ejs");
var CommentView = require("./comment");
var Items  = require("../../collections/item.collection");
var Comment  = require("../../models/comment.model");

module.exports = Backbone.View.extend({
    tagName: "div",
    className: "comments-list",
    views: [],
    template: template,
    events: {
        "click #addNewComment": "openForm",
        "click #addComment": "addComment",
        "click #back": "back"
    },

    initialize: function (item) {
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "add", this.render);
        this.itemId = item.itemId;
        var items = new Items();
        items.fetch();
        this.items = items;
    },

    render: function () {
        _.invoke(this.views, "destroy");
        this.views = [];
        this.$el.html(this.template({title: this.items.get(this.itemId).toJSON().title})+templPopup());
        _.each(this.collection.models, function (model) {
            if (model.get("itemId") == this.itemId) {
                var modelView = new CommentView({
                    model: model
                });
                this.views.push(modelView);
                this.$el.append(modelView.render().$el);
            }
        }, this);
    },

    openForm: function() {
        $(".blackBackground").toggleClass("hide");
        $("form[name='new-comment']").toggleClass("hide");
    },

    addComment: function() {
        var comment = new Comment({
            id: Math.round(Math.random()*1000),itemId: this.itemId,
            username: $("input[name='username']").val(),
            text: $("textarea").val()
        });
        $(".blackBackground").toggleClass("hide");
        $("form[name='new-comment']").toggleClass("hide");
        this.collection.add(comment);
        Backbone.sync("create", comment);
    },
    back: function() {
        window.history.back();
    },
    destroy: function () {
        _.invoke(this.views, "remove");
        this.remove();
    }
});
