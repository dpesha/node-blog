require('../db-connect.js');
var assert=require('assert');
var Blog = require('../app/models/Blog');


describe ('Blog', function(){
	before(function(done){
		Blog.remove(done);
	})
	describe('create & view',function(){
		it('should create a new document', function(done){
			var blog;
			blog=new Blog({
				title:'heloo!',
				body:'This is my first blog'
			});
			blog.save(function(){
				Blog.findOne({ _id: blog.id },function(err, blog){
					blog.title.should.eql('heloo!');
					blog.body.should.eql('This is my first blog');
					done();
				});
			});
		});
	});
	describe('list all',function(){
		it('should list all the document', function(done){
			var blog;
			blog=new Blog({
				title:'another blog!',
				body:'hey this is another blog'
			});
			blog.save(function(){
				Blog.find(function(err, blg){
					blg[blg.length-1].title.should.eql('another blog!');
					blg[blg.length-1].body.should.eql('hey this is another blog');
					done();
				});
			});
			
		});
	});
	describe('update',function(){
		it('should update a document', function(done){
			var blog;
			blog=new Blog({
				title:'yet another blog!',
				body:'hey this is yet another blog'
			});
			blog.save(function(){
				Blog.findOne({_id:blog.id},function(err, blg){
					blg.title='updated blog';
					blg.body='hey this is an updated blog';
					blg.save(function(){
						Blog.findOne({_id:blog.id},function(err, blgg){
							blgg.title.should.eql('updated blog');
							blgg.body.should.eql('hey this is an updated blog');
							done();	
						});
					});
				});
			});			
		});
	});
	describe('delete document',function(){
		it('should delete a document',function(done){
			Blog.find(function(err,blog){
				
				Blog.findOne({_id:blog[blog.length-1]._id},function(err,blg){
					
					if(err) throw err;
					if(blg){
						blg.remove(function(){
							
							Blog.findOne({_id:blg._id},function(err,blgg){
								assert(!blgg);
								done();
							})
							
						});
					}
				});
			});
		});
	});
});
