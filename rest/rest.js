require('../db-connect.js');
var Blog = require('../app/models/Blog');

// TODO Add Authentication

//READ
exports.listEntries=function(req,res){
	
	return Blog.find({'state':true},function (err, blogs) {
		if (!err) {
	    	return res.send(blogs);
	    } else {
	    	return console.log(err);
	    }
	});
};

//CREATE
exports.newEntry=function(req,res){
	var blog = new Blog(req.body.blog);
	blog.state = (req.body.blog.state === 'true');
	blog.author.username="Dipesh Acharya";
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
				} else if(key === 'comments'){
					blog[key].push(req.body.blog[key]); 
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