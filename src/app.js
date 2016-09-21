var Backbone = require("backbone/backbone");
var SectionRouter = require("./routers/sections");
var IndexRouter = require("./routers/index");
var config = require("./app.config");
var $ = require("jquery/dist/jquery");

var index = new IndexRouter();
var sections = new SectionRouter();

Backbone.history.start();

entry.onclick = function() {
    if ((auth.login.value === "admin")&&(auth.pass.value === "admin")) {
        config.auth = true;
        $("form[name='auth']").addClass("hide");
        $(".exit").removeClass("hide");
        Backbone.history.navigate("/",true);
    }
};

exit.onclick = function() {
    config.auth = false;
    $(".exit").addClass("hide");
    $("form[name='auth']").removeClass("hide");
    Backbone.history.navigate("/",true);
};
