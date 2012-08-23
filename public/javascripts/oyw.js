var OpenYourWorld = function(){};

OpenYourWorld.prototype ={
	loadAll:function(callback){
		$.getJSON('/entries', function(data) {
			if(callback){
    			callback(data);
    		}  			  			
        });        
	},
	load:function(id,callback){
		$.getJSON('/entries/'+id, function(data) {
			var items=[];
			items.push(data.title);
			items.push(data.author.username);
			items.push(data.created);
			items.push(data.body);
			items.push(data.tags);
			items.push(data.state);
			items.push(data.comments);
			if(callback){
				callback(items);
			}
		});
	},
	post:function(postdata,callback){
		$.post('/entries',postdata, function(data){
			if(callback)
				callback(data);	
		});
	},
	put:function(id,postdata,callback){
		$.ajax({
			type:'PUT',
			url:'/entries/'+id,
			data:postdata,
			success:function(data){
				if(callback)
					callback(data);				
			}
		});
	},
	del:function(id,callback){
		$.ajax({
			type:'DELETE',
			url:'/entries/'+id,			
			success:function(data){
				if(callback)
					callback(data);				
			}
		});
	},
	postComment:function(id,postdata,callback){
		$.post('/entries/'+id+'/comments',postdata, function(data){
			if(callback)
				callback(data);	
		});		
	}
}
