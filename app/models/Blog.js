var CommentSchema = new Schema({
  name: String, 
  body: String,
  email: String,
  created: Date
});

var BlogSchema = new Schema({  
    title: String,
    body: String,
    tags: String,
    created: { type: Date, default: Date.now } ,
    modified: Date,
    state: Boolean,
    author: {
    	username:String
    },
    comments:[CommentSchema]
});

var exports = module.exports = Blog = mongoose.model('Blog', BlogSchema);