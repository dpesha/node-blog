exports.index = function(req, res){
	res.render('index', { title: 'Open Your World!'});	
};

exports.listBlogs = function(req, res){
	res.render('index', { title: 'Open Your World!'});	
};

exports.editBlog=function(req,res){
	if(req.params.id){
		res.render('editpost',{title:'Open Your World!', id:req.params.id});
	} else { 
		res.render('editpost',{title:'Open Your World!', id:'undefined'});
	}
};
exports.viewBlog=function(req,res){
	res.render('post', {title:'Open Your World!',id:req.params.id,md:md});	
}


