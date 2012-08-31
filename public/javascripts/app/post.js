OYW.App = OYW.App || {};

OYW.App.Post = (function() {

	var id, oyw;
	var init = function(idd) {
			oyw = new OpenYourWorld();
			id = idd;
			showBlog();
		};

	var showBlog = function() {
			oyw.load(id, function(data) {
				OYW.App.Post.Content.show(data[2], data[0], data[3]);
				OYW.App.Post.CommentList.show(data[6]);
			});
		};

	var confirmDelete = function() {
			if (confirm('Really, do you want to delete?')) {
				oyw.del(id, function(data) {
					window.location.replace('/');
				});
			}
		};
	var submitComment = function(comment) {
			oyw.postComment(id, {
				comment: comment
			}, function(data) {
				window.location.reload();
			});
		}

	return {
		init: init,
		confirmDelete: confirmDelete,
		submitComment: submitComment
	}

}());

// Content 
OYW.App.Post.Content = (function() {

	var init = function() {
			this.elements = {
				'title': $('#title'),
				'date': $('#date'),
				'blogtext': $('#body'),
				'edit': $('#edit'),
				'delete': $('#delete'),
				'commentform': $('#commentbox #field')
			};
		};
	var show = function(date, title, blogtext) {
			this.elements.date.html(OYW.Utils.dateToYMD(new Date(date)));
			this.elements.title.html(title);
			this.elements.blogtext.html(marked(blogtext));
			this.elements.edit.attr('href', window.location.href + '/edit');
			this.elements.delete.click(function(e) {
				e.preventDefault();
				OYW.App.Post.confirmDelete();
			});
			var CommentForm = new OYW.App.Post.CommentForm(this.elements.commentform)
			CommentForm.init();
		};
	return {
		init: init,
		show: show
	}
}(jQuery));

// Comment List
OYW.App.Post.CommentList = (function($) {

	//this.dbpath = "comments";
	var init = function() {
			this.elements = {
				'totalcomments': $('#ccount'),
				'commentlist': $('#commentlist')
			};
		};
	var show = function(data) {
			this.elements.totalcomments.html('{ ' + data.length + ' Comments }')
			populateComments(this.elements.commentlist, data);
		};

	var populateComments = function(parent, data, path) {
			var basePath = path || 'comments';

			for (var i = 0; i < data.length; i++) {
				var pathPosition = basePath + '.' + i;
				var pathDepth = pathPosition + '.comments';

				var Comment = new OYW.App.Post.Comment(parent, pathDepth);
				Comment.init(data[i].url, data[i].name, data[i].body);
				if (data[i].comments.length > 0) {
					populateComments(Comment.getChild(), data[i].comments, pathDepth);
				}
			}
		};
	return {
		init: init,
		show: show
	}
}(jQuery));

// Comment Item
OYW.App.Post.Comment = function(parent, path) {

	this.parent = parent;
	this.path = path;
	this.commenterElement = $(document.createElement('dt'));
	this.commenterURLElement = $(document.createElement('a'));
	this.bodyElement = $(document.createElement('dd'));
	this.replyElement = $(document.createElement('dd'));
	this.replyLinkElement = $(document.createElement('a'));
	this.childElement = $(document.createElement('dd'));
	this.wrapElement = $(document.createElement('div'));

}

OYW.App.Post.Comment.prototype.init = function(commenterurl, commenter, body) {

	// Add Commenter URL Element
	this.commenterURLElement.attr('href', commenterurl);
	this.commenterURLElement.html(commenter)
	this.commenterElement.append(this.commenterURLElement);
	this.wrapElement.append(this.commenterElement)

	// Add Body
	this.bodyElement.html(body);
	this.wrapElement.append(this.bodyElement);

	// Add Reply
	this.replyLinkElement.attr('href', '#');
	this.replyLinkElement.html('Reply');
	this.replyElement.append(this.replyLinkElement);
	this.wrapElement.append(this.replyElement);

	this.parent.append(this.wrapElement);

	var that = this;
	this.replyLinkElement.click({
		show: true
	}, function(e) {
		e.preventDefault();

		if (e.data.show) {
			$(this).after($("#commentbox  #field").clone());
			this.CommentForm = new OYW.App.Post.CommentForm($(this).next(), that.path);
			this.CommentForm.init();
			this.CommentForm.clear();
		} else {
			$(this).next().remove();
			this.CommentForm = null;
		}
		e.data.show = !e.data.show;
	});
}

OYW.App.Post.Comment.prototype.getChild = function() {
	this.parent.append(this.childElement);
	return this.childElement;
}

// Comment Form
OYW.App.Post.CommentForm = function(parent, path) {
	this.path = path || 'comments';
	this.parent = parent;
}

OYW.App.Post.CommentForm.prototype.init = function() {
	this.elements = {
		'name': this.parent.find('#name'),
		'url': this.parent.find('#url'),
		'ctext': this.parent.find('#ctext'),
		'submit': this.parent.find('#submit')
	}
	var that = this;
	this.elements.submit.click(function() {
		that.submit();
	});
}

OYW.App.Post.CommentForm.prototype.submit = function() {
	var data = {
		name: this.elements.name.val().trim(),
		url: this.elements.url.val().trim(),
		body: this.elements.ctext.val().trim()
	}
	var comment = {
		path: this.path,
		data: data
	}
	OYW.App.Post.submitComment(comment);
}

OYW.App.Post.CommentForm.prototype.clear = function() {
	this.elements.name.val('');
	this.elements.url.val('');
	this.elements.ctext.val('');
}

// Initialize App
$(function() {
	OYW.App.Post.Content.init();
	OYW.App.Post.CommentList.init();
	//OYW.App.Post.init();
});