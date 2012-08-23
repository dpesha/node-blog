
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , rest = require('./rest/rest')
  , http = require('http')
  , path = require('path')
  , expose = require('express-expose');
  exports=bcrypt=require('bcrypt');
  
var app = express();

// Support markdown
exports= md = require("marked");
var store= new express.session.MemoryStore;
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ 
    key: 'secretkey',
    secret: '34 secret34!',
    store: store 
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function authenticate(req,res,next){
  if(req.session.user){
    next();
  } else {    
    routes.error(req,res);
  }
}

// URL Routes
app.get('/', routes.index);
app.get('/blog', routes.listBlogs);
app.get('/blog/login', routes.logIntoBlog);
app.post('/blog/login',routes.userLogin);
// TODO:authenticate
app.get('/blog/edit', authenticate, routes.editBlog);
app.get('/blog/:id', routes.viewBlog);
// TODO:authenticate
app.get('/blog/:id/edit', authenticate, routes.editBlog);


// RESTFUL URL
app.get('/entries', rest.listEntries);
// TODO:authenticate
app.post('/entries', authenticate, rest.newEntry);
app.get('/entries/:id', rest.viewEntry);
// TODO:authenticate
app.put('/entries/:id', authenticate, rest.updateEntry);
// TODO:authenticate
app.del('/entries/:id', authenticate, rest.deleteEntry);
app.post('/entries/:id/comments', rest.addComments);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
