var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// MIDDLEWARES
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE
var models = require('./models');

models.sequelize.sync().then(function() {
	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});
}).catch(function(err) {
	console.error(err);
});

// ROUTES
app.get('/', function(req,res) {
	res.render('blog-form');
});

app.get('/blog', function(req,res) {
	models.posts.findAll().then(function(posts) {
		var arr = [];

		posts.forEach(function(item) {
			arr.push(item.dataValues);
		});

		arr.reverse();

		res.render('blog-form', { blug: arr });
	});
});

app.get('/blog/all', function(req,res) {
	models.posts.findAll().then(function(posts) {
		var arr = [];

		posts.forEach(function(item) {
			arr.push(item.dataValues);
		});

		arr.reverse();

		res.render('blogposts', { blug: arr });
	});
});

// send ejs to server with data
app.post('/blogposts', function(req,res) {
	var newTitle = req.body.title;
	var newBody = req.body.comments;

	// This works!
	models.posts.create({
		title: newTitle,
		body: newBody
	}).then(function(x) {
		// console.log(x.dataValues);
		var blug = []
		blug.push(
			{
				title: x.dataValues.title,
				body: x.dataValues.body,
				date: x.dataValues.createdAt
			}
		);

		res.redirect('/blog');
	});

});
