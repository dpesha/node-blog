OYW.App = OYW.App || {};

OYW.App.Index = (function() {

    var init = function() {
            var oyw = new OpenYourWorld();
            oyw.loadAll(function(data) {
                $.each(data, function(key, value) {
                    OYW.App.Index.View.listBlogs(value.created, value._id, value.title);
                });
            });
        };
    return {
        init: init
    }
}());


OYW.App.Index.View = (function($) {

    var list;

    function init() {
        list = $('#listblogs');
    }

    function listBlogs(date, id, title) {
        list.append('<li><span>' + OYW.Utils.dateToYMD(new Date(date)) + ' : </span><a href="/blog/' + id + '">' + title + '</a></li>');
    }

    return {
        init: init,
        listBlogs: listBlogs
    };

}(jQuery));

// Initialize App
$(function() {
    OYW.App.Index.View.init();
    OYW.App.Index.init();
});