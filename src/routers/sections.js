var Backbone = require("backbone/backbone");
var SectionListController = require("../controllers/section-list");
var SectionDetailsController = require("../controllers/section-details");
var ItemDetailsController = require("../controllers/item-details");

module.exports = Backbone.Router.extend({
    routes: {
        "section": "sectionList",
        "section/:id": "sectionItem",
        "item/:id": "itemDetail",
    },
    previousController: null,
    changePage: function (controller, params) {
        if (this.previousController) {
            this.previousController.destroy();
        }
        this.previousController = new controller(params);
    },

    sectionList: function () {
        this.changePage(SectionListController);
    },

    sectionItem: function (id) {
        this.changePage(SectionDetailsController, id);
    },
    itemDetail: function (id) {
        this.changePage(ItemDetailsController, id);
    }

});
