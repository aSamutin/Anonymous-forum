var View = require("../view");
// var config = require("../../app.config");
var router = require("../../app.router");
var inherit = require("../../utils/inherit");
// var request = require("../../services/request");
var $ = require("jquery/dist/jquery");
var template = require("./comments-list.ejs");

var CommentsListView = function (id) {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    this.itemId = id;

};

inherit(CommentsListView, View);

CommentsListView.prototype.render = function () {
    var data = this.getRenderData();
    this.el.html(this.template({item: data}));
};

CommentsListView.prototype.createEvents = function () {
    this.el.on("click", "#back", this.back);
    this.el.on("click", "#addNewComment", this.addNewComment);
    this.el.on("click", "#addComment", this.addNewComment);
};

CommentsListView.prototype.back = function () {
    router.navigate("sections-list");
};

CommentsListView.prototype.addNewComment = function () {
    $(".blackBackground").toggleClass("hide");
    $("form[name='new-comment']").toggleClass("hide");
};

CommentsListView.prototype.close = function () {
    this.el.off("click", "li");
};

CommentsListView.prototype.getRenderData = function () {
    var item= {"title":this.itemId, "commentsList":[{"username":"Павел","date":"18/10/94","text":"Ktttktktk"},{"username":"Павел","date":"18/10/94","text":"Текст комментария"}]};
    return item;
};

CommentsListView.prototype.fetchData = function () {

};

module.exports = CommentsListView;
