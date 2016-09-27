var Backbone = require("backbone/backbone");
var _ = require("underscore");
var $ = require("jquery/dist/jquery");
var template = require("./index.ejs");
var templPopup = require("./new-comment.ejs");
var CommentView = require("./comment");
var Items  = require("../../collections/item.collection");
var Comment  = require("../../models/comment.model");
var Quill = require("quill/dist/quill.min");

module.exports = Backbone.View.extend({
    tagName: "div",
    className: "comments-list",
    views: [],
    template: template,
    events: {
        "click #addNewComment": "openForm",
        "click #addComment": "addComment",
        "click #back": "back",
        "click .close": "closePopup"
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
        this.$(".blackBackground").toggleClass("hide");
        this.$("form[name='new-comment']").toggleClass("hide");
        var quill = new Quill("#editor", {
            placeholder: "Введите текст сообщения...",
            theme: "snow"
        });
    },

    addComment: function() {
        var comment = new Comment({
            itemId: this.itemId,
            username: this.$("input[name='username']").val(),
            text: this.$(".ql-editor p").html()
        });
        this.$(".blackBackground").toggleClass("hide");
        this.$("form[name='new-comment']").toggleClass("hide");
        this.collection.add(comment);
        comment.save();
    },
    back: function() {
        window.history.back();
    },
    closePopup: function() {
        this.$(".blackBackground").toggleClass("hide");
        this.$("form[name='new-comment']").toggleClass("hide");
    },
    destroy: function () {
        _.invoke(this.views, "remove");
        this.remove();
    }
});
