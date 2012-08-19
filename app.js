
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , rest = require('./rest/rest')
  , http = require('http')
  , path = require('path');

var app = express();

// Support markdown
exports= md = require("marked");

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// URL Routes
app.get('/', routes.index);
app.get('/blog', routes.listBlogs);
app.get('/blog/edit', routes.editBlog);
app.get('/blog/:id', routes.viewBlog);
app.get('/blog/:id/edit', routes.editBlog);


// RESTFUL URL
app.get('/entries', rest.listEntries);
app.post('/entries', rest.newEntry);
app.get('/entries/:id', rest.viewEntry);
app.put('/entries/:id', rest.updateEntry);
app.del('/entries/:id', rest.deleteEntry);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
