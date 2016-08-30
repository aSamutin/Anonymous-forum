var View = require("../view");
// var config = require("../../app.config");
var router = require("../../app.router");
var inherit = require("../../utils/inherit");
// var request = require("../../services/request");
var $ = require("jquery/dist/jquery");
var template = require("./sections-list.ejs");

var SectionsListView = function () {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;

};

inherit(SectionsListView, View);

SectionsListView.prototype.render = function () {
    var data = this.getRenderData();
    this.el.html(this.template({sectionsList: data}));
};

SectionsListView.prototype.createEvents = function () {
    this.el.on("click", "li", this.openItem);
    this.el.on("click", "#addNewItem", this.addNewItem);
    this.el.on("click", "#addItem", this.addNewItem);
};

SectionsListView.prototype.openItem = function() {
    router.navigate("comments-list", this.dataset.id);
};

SectionsListView.prototype.addNewItem = function() {
    $(".blackBackground").toggleClass("hide");
    $("form[name='new-item']").toggleClass("hide");
};

SectionsListView.prototype.close = function () {
    this.el.off("click", "li");
};

SectionsListView.prototype.getRenderData = function () {

    var sectionsList = [{"title":"Первый раздел", "itemsList":[{"id":1,"title":"Тема 1"}, {"id":2,"title":"Тема 2"} ]},{"title":"Второй раздел", "itemsList":[{"id":1,"title":"Тема 1"}]}];
    return sectionsList;
};

SectionsListView.prototype.fetchData = function () {

};

module.exports = SectionsListView;
