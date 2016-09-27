var Backbone = require("backbone/backbone");
var template = require("./item.ejs");
var Comments = require("../../collections/comment.collection");
var config = require("../../app.config");
var $ = require("jquery/dist/jquery");
var _ = require("underscore");

module.exports = Backbone.View.extend({
    views: [],
    tagName: "div",
    className: "item",
    template: template,
    events: {
        "click #deleteItem": "deleteItem"
    },

    render: function () {
        var data = this.model.toJSON();
        data.config = config.auth;
        this.$el.html(this.template(data));
        this.$el.data("id", data.id);

        return this;
    },

    deleteItem: function () {
        var that = this;
        this.comments = new Comments();
        this.comments.fetch().then(function(){
            that.model.url += "/"+that.model.get("id");
            _.each(that.comments.models, function(comment){
                if(that.model.get("id") == comment.get("itemId")) {
                    comment.url += "/"+comment.get("id");
                    comment.sync("delete", comment);
                }
            });
            that.model.destroy();
        });
        that.remove();
    },

    navigate: function () {
        var elem = $(event.currentTarget);
        var id = elem.data("id");
        Backbone.history.navigate(`item/${id}`, true);
    }
});
