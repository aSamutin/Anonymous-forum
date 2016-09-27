var Backbone = require("backbone/backbone");
var SectionRouter = require("./routers/sections");
var IndexRouter = require("./routers/index");
var Header = require("./views/header");
var config = require("./app.config");
var $ = require("jquery/dist/jquery");
require("../styles/style.css");
require("quill/dist/quill.snow.css");

var header = new Header();
var index = new IndexRouter();
var sections = new SectionRouter();

Backbone.history.start();
