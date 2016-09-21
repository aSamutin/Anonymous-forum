var Backbone = require("backbone/backbone");
var template = require("./section.ejs");
var config = require("../../app.config");

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
        this.model.url += "/"+this.model.get("id");
        this.model.sync("delete", this.model);
        this.model.destroy();
        this.remove();
    },
    navigate: function () {
        Backbone.history.navigate("section", true);
    }
});
