var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');


// Sequelizin
var Sequelize = require('sequelize');
var databaseURL = 'sqlite://dev.sqlite3';
var sequelize = new Sequelize(databaseURL);


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req,res) {
	res.render('blog-form', { blug: blogPosts });
})

var blogPosts = sequelize.define('blogPost', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	comments: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},

	timestamp: {
		type: Sequelize.DATE,
		allowNull: false
	}
});

sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log("ExpressJS started on port: " + port);
	});
}).catch(function(err) {
	console.error(`UH OH! YOU GOT AN ERROR: ${err}`);
});


//create
app.get('/blog', function(req,res) {
	res.render('blog-form', { blug: blogPosts });
})

app.get('/blog/all', function(req,res) {
	res.json(blogPosts);
})




//send ejs to server with data
app.post('/blogposts', function(req,res) {
	var posts = {
		newTitle: req.body.title,
		newComments: req.body.comments,
		newDate: new Date()
	}
	
	blogPosts.create({
		title: posts.newTitle,
		comments: posts.newComments,
		timestamp: posts.newDate
	});

	
	console.log(blogPosts);
	res.render('blog-form', { blug: blogPosts });
})
