OYW.App = OYW.App || {};

// Post
OYW.App.Post = (function() {

	var id, oyw;
	var init = function(idd) {
			oyw = new OpenYourWorld();
			id = idd;
			if (id) {
				showBlog();
			}
		};

	var showBlog = function() {
			oyw.load(id, function(data) {
				OYW.App.Post.Edit.update(data);
			});
		};


	var submitBlog = function(blog) {
			if (id) {
				oyw.put(id, {
					blog: blog
				}, function(data) {
					window.location.replace('/');
				});
			} else {
				oyw.post({
					blog: blog
				}, function(data) {
					window.location.replace('/');
				});
			}
		};

	return {
		init: init,
		submitBlog: submitBlog
	}

}());

// Edit 
OYW.App.Post.Edit = (function() {

	var init = function() {
			this.elements = {
				'title': $('#title'),
				'blog': $('#blog'),
				'tags': $('#tags'),
				'state': $('#state'),
				'publish': $('#publish')
			};
			this.elements.blog.markItUp(mySettings);
			var that = this;
			this.elements.publish.click(function() {
				submit.call(that);
			});

		};
	var update = function(data) {
			this.elements.title.val(data[0]);
			this.elements.blog.val(data[3]);
			this.elements.tags.val(data[4]);
			this.elements.state.prop('checked', data[5]);
		};
	var submit = function() {
			var data = {
				title: this.elements.title.val(),
				body: this.elements.blog.val(),
				tags: this.elements.tags.val(),
				state: this.elements.state.is(':checked')
			}
			OYW.App.Post.submitBlog(data);
		}
	return {
		init: init,
		update: update
	}
}(jQuery));

// Initialize App
$(function() {
	OYW.App.Post.Edit.init();
	//OYW.App.Post.init();    
});