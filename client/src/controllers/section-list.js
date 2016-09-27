var $ = require("jquery/dist/jquery");

var BasicController = require("./basic");
var SectionCollection = require("../collections/section.collection");
var SectionListView = require("../views/section-list");

module.exports = BasicController.extend({
    initialize: function () {
        this.model = new SectionCollection();
        this.view = new SectionListView({
            collection: this.model
        });
        $("#content").append(this.view.$el);
        this.model.fetch();
    }
});
