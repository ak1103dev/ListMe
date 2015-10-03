var User = require('./models/user');
module.exports = function(app, passport){
	app.get('/', function(req, res){
		console.log("main");
		res.send("main");
	});

	app.get('/login', function (req, res) {
		console.log("login");
		res.send("login");
	});

	app.get('/signup', function (req, res) {
		console.log("signup");
		res.send("signup");
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.post('/signup', function (req, res) {
		var newUser = new User();
		newUser.local.username = req.body.username;
		newUser.local.email= req.body.email;
		newUser.local.password = newUser.generateHash(req.body.password);
		newUser.save(function(err){
			if(err)
				throw err;
		});
		res.redirect("/signup");
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	})
};
