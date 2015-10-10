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

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.post('/signup', function (req, res) {
		User.findOne({'local.email': req.body.email}, function(err, user) {
			if(err)
					console.log(err);
			if(user)
					res.send("This e-mail is used.");
			else {
				var newUser = new User();
				newUser.local.username = req.body.username;
				newUser.local.email= req.body.email;
				newUser.local.password = newUser.generateHash(req.body.password);
				newUser.save(function(err){
					if(err)
						throw err;
				});
				res.send("signup");
			}
		});
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	})
};
