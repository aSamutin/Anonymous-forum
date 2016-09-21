var Backbone = require("backbone/backbone");
var template = require("./item.ejs");
var config = require("../../app.config");
var $ = require("jquery/dist/jquery");

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
        this.model.url += "/"+this.model.get("id");
        this.model.sync("delete", this.model);
        this.model.destroy();
        this.remove();
    },
    navigate: function () {
        var elem = $(event.currentTarget);
        var id = elem.data("id");
        Backbone.history.navigate(`item/${id}`, true);
    }
});
