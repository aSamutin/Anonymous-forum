var $ = require("jquery/dist/jquery");

var BasicController = require("./basic");
var CommentCollection = require("../collections/comment.collection");
var ItemDetailsView = require("../views/item-details");

module.exports = BasicController.extend({
    initialize: function (id) {
        this.model = new CommentCollection();
        this.view = new ItemDetailsView({
            collection: this.model,
            itemId: id
        });
        $("#content").append(this.view.$el);
        this.model.fetch();
    }
});
