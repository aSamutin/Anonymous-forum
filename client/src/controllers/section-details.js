var $ = require("jquery/dist/jquery");

var BasicController = require("./basic");
var ItemCollection = require("../collections/item.collection");
var SectionDetailsView = require("../views/section-details");

module.exports = BasicController.extend({
    initialize: function (id) {
        this.model = new ItemCollection();
        this.view = new SectionDetailsView({
            collection: this.model,
            sectionId: id
        });
        this.model.fetch();
        $("#content").append(this.view.$el);
    }
});
