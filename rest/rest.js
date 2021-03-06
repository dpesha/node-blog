require('../db-connect.js');
var Blog = require('../app/models/Blog').Blog;
var Comment = require('../app/models/Blog').Comment;


//READ all entries
exports.listEntries=function(req,res){
	if(req.session.user){
		return Blog.find().sort('created',-1).exec(function (err, blogs){
		if (!err) {
	    	return res.send(blogs);
	    } else {
	    	return console.log(err);
	    }
	});
	} else {
		return Blog.find({'state':true}).sort('created',-1).exec(function (err, blogs){
			if (!err) {
		    	return res.send(blogs);
		    } else {
		    	return console.log(err);
		    }
		});
	}
};

//CREATE
exports.newEntry=function(req,res){
	var blog = new Blog(req.body.blog);
	blog.state = (req.body.blog.state === 'true');
	blog.author.username=config.blog.author;
	return blog.save(function (err){	  
	    if (!err) {
	      console.log('created entry');
	      return res.send(blog);
	    } else {
	      return console.log(err);
	    }	    
	});	  
};

// READ
exports.viewEntry=function(req,res){
	return Blog.findById(req.params.id, function (err, blog) {
		if (!err) {
    		return res.send(blog);
    	} else {
      		console.log(err);
      		return res.send(err);
    	}
    });	
};

//UPDATE
exports.updateEntry=function(req,res){
	
	return Blog.findById(req.params.id, function (err, blog) {
		
		for(var key in req.body.blog){
			if(req.body.blog.hasOwnProperty(key)){
				if(key === 'state'){
					blog[key]=(req.body.blog[key] === 'true');				
				} else {
					blog[key]=req.body.blog[key];
				}
			}
		}		

    	return blog.save(function (err) {
      		if (!err) {
        		console.log("updated entry");
        		return res.send(blog);
      		} else {
        		console.log(err);
      		}
       	});
  	});
};

//DELTE
exports.deleteEntry=function(req,res){
	return Blog.findById(req.params.id, function (err, blog) {
	    return blog.remove(function (err) {
	    	if (!err) {
	        	console.log("removed");
	        	return res.send('');
	      	} else {
	        	console.log(err);
	      	}
    	});
  	});
};

// Update Comment
exports.addComments=function(req,res){
	return Blog.findById(req.params.id, function (err, blog) {
		var update={};
		update[req.body.comment.path]=new Comment(req.body.comment.data);
		Blog.update({ _id : blog._id }, { '$push': update},function(err){
			if (!err) {
        		console.log("added comments");
        		return res.send(blog);
      		} else {
        		console.log(err);
      		}
		});	
	});	
};
