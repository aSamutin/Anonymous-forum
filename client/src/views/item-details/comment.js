var Backbone = require("backbone/backbone");
var template = require("./comment.ejs");
var config = require("../../app.config");

module.exports = Backbone.View.extend({
    views: [],
    tagName: "div",
    className: "comment",
    template: template,
    events: {
        "click #deleteComment": "deleteComment"
    },

    render: function () {
        var data = this.model.toJSON();
        data.config = config.auth;
        this.$el.html(this.template(data));

        return this;
    },
    
    deleteComment: function () {
        this.model.url += "/"+this.model.get("id");
        this.model.destroy();
        this.remove();
    }
});
