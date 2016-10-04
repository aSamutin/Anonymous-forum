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
    },

    render: function () {
        var that = this;
        var items = new Items();
        items.fetch().then(function(){
            that.items = items;
            _.invoke(that.views, "destroy");
            that.views = [];
            that.$el.html(that.template({title: that.items.get(that.itemId).toJSON().title})+templPopup());
            _.each(that.collection.models, function (model) {
                if (model.get("itemId") == that.itemId) {
                    var modelView = new CommentView({
                        model: model
                    });
                    that.views.push(modelView);
                    that.$el.append(modelView.render().$el);
                }
            }, that);
        });
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
