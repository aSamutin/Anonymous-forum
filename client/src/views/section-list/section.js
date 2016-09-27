var Backbone = require("backbone/backbone");
var template = require("./section.ejs");
var Items = require("../../collections/item.collection");
var Comments = require("../../collections/comment.collection");
var config = require("../../app.config");
var _ = require("underscore");

module.exports = Backbone.View.extend({
    template: template,
    views: [],
    tagName: "div",
    className: "section",
    events: {
        "click #deleteSection": "deleteSection"
    },

    render: function () {
        var data = this.model.toJSON();
        data.config = config.auth;
        var tmpl = this.template(data);
        this.$el.html(tmpl);
        this.$el.data("id", data.id);
        return this;
    },

    deleteSection: function () {
        var that = this;
        this.items = new Items();
        this.comments = new Comments();
        this.items.fetch().then(function(){
            that.comments.fetch().then(function(){
                that.model.url += "/"+that.model.get("id");
                _.each(that.items.models, function(item){
                    if(that.model.get("id") == item.get("sectionId")) {
                        item.url += "/"+item.get("id");
                        _.each(that.comments.models, function(comment){
                            if(item.get("id") == comment.get("itemId")) {
                                comment.url += "/"+comment.get("id");
                                comment.sync("delete", comment);
                            }
                        });
                        item.sync("delete", item);
                    }
                });
                that.model.destroy();
            });
        });
        that.remove();
    },

    navigate: function () {
        Backbone.history.navigate("section", true);
    }
});
