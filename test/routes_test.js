// routes test

require('should');
routes = require('../routes/routes');


describe ('routes', function(){
	var req, res;
	req={
		params:{},
		body:{}
	};
	res={};

	
	describe('index',function(){
		it('should display index with blog',function(done){
			res.render=function(view, locals){
					view.should.equal('index');
					locals.title.should.equal('Open Your World!');
					done();
				};
			routes.index(req, res);
		});
	});
	describe('listBlogs',function(){
		it('should display list of blog',function(done){
			res.render=function(view, locals){
					view.should.equal('index');
					locals.title.should.equal('Open Your World!');
					done();
				};
			routes.listBlogs(req, res);
		});
	});
	describe('new blog', function(){
		it('should display new/edit blog ',function(done){
			res.render=function(view, locals){
					view.should.equal('editpost');
					locals.title.should.equal('Express Yourself');
					done();
				};
			routes.editBlog(req,res);
		});
	});
	describe('view blog', function(){
		it('should show blog',function(done){
			res.render=function(view, locals){
				view.should.equal('post');
				locals.title.should.equal('Open Your World!');
				done();
			};
			routes.viewBlog(req,res);	
		});	
			
	});
});
