require('../db-connect.js');
var User = require('../app/models/User');


exports.index = function(req, res){
	res.render('index', { title : title });	
};

exports.listBlogs = function(req, res){
	res.render('index', { title: title });	
};

exports.editBlog=function(req,res){
	if(req.params.id){
		res.render('editpost',{ title: title, id: req.params.id });
	} else { 
		res.render('editpost',{ title: title, id: 'undefined' });
	}
};
exports.viewBlog=function(req,res){
	res.render('post', { title: title, id: req.params.id, user: req.session.user });	
}

exports.logIntoBlog=function(req,res){
	res.render('login', { title: 'Login!', message:'' });	
}

exports.userLogin=function(req,res){
	var user=req.body.login.name;
	var pass=req.body.login.pass;
	User.findOne({'name':user},function(err,result){
		
		if(result===null){
			res.render('login',{ title: 'Login!', message: 'Invalid Credentials' })
		} else {			
			bcrypt.compare(pass, result.pass, function(err, data) {
    			if(data){
    				req.session.user=user;
    				res.redirect('/');
    			}
    			else {
    				res.render('login',{ title: 'Login!', message: 'Invalid Credentials' })
    			}
			});
		}		
	})	
}

exports.error=function(req,res){
	res.render('error', { title: 'Ooops!', message: 'Not allowed!' });
}

exports = config = require('../config/base');
var title=config.blog.title;
