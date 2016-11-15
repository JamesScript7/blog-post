var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res) {
	res.render('blog-form', { blug: blogPosts });
})


//global var
var blogPosts = [];

//create
app.get('/blog', function(req,res) {
	res.render('blog-form', { blug: blogPosts });
})

app.get('/blog/all', function(req,res) {
	res.json(blogPosts);
})

//send ejs to server with data
app.post('/blogposts', function(req,res) {
	var newTitle = req.body.title;
	var newComments = req.body.comments;
	var newDate = new Date();
	
	var newPost = {
		title: newTitle,
		comments: newComments,
		date: newDate
	}


	blogPosts.push(newPost);
	

	console.log(blogPosts);
	res.render('blog-form', { blug: blogPosts });
})










app.listen(port, function() {
	console.log("ExpressJS started on port: " + port);
})