var router = require("./app.router");

var SectionsListView = require("./views/sections-list");
var CommentsListView = require("./views/comments-list");

router.addView("sections-list", SectionsListView, true);
router.addView("comments-list", CommentsListView); 
