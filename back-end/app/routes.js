var User = require('./models/user');
module.exports = function(app, passport){
	app.get('/', function(req, res){
		console.log("main");
		res.send(req.user);
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
				newUser.lastActiveIndex = 0;
				newUser.save(function(err){
					if(err)
						throw err;
				});
				res.send("signup");
			}
		});
	});

	/*
	app.post('/fb-login', passport.authenticate('local-login', {
			successRedirect: '',
			failureRedirect: '',
			failureFlash: true
	}));
*/

	app.post('/facebook', function (req, res) {
		console.log(req.body);
		User.findOne({'facebook.id': req.body.id}, function(err, user) {
			if(err)
					console.log(err);
			if(user) {
					console.log(user);
					res.send(user._id);
			}
			else {
				var newUser = new User();
				newUser.facebook.name = req.body.name;
				newUser.facebook.email= req.body.email;
				newUser.facebook.id = req.body.id;
				newUser.lastActiveIndex = 0;
				newUser.save(function(err){
					if(err)
						throw err;
				});
				console.log(newUser._id);
				res.send(newUser._id);
			}
			console.log("facebookAuthen");
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
	});

	app.post('/save', function (req, res) {
		User.findOne({'_id': req.user._id}, function(err, user) {
			if(err)
					console.log(err);
			else {
				user.group = req.body;
				user.save(function(err){
					if(err)
						throw err;
				});
				console.log("save");
				res.send("save");
			}
		});
	});

	app.post('/setLastActiveIndex', function (req, res) {
			console.log(req.body);
		//User.findOne({'_id': req.user._id}, function(err, user) {
		//	if(err)
		//			console.log(err);
		//	else {
		//		user.lastActiveIndex = req.body;
		//		user.save(function(err){
		//			if(err)
		//				throw err;
		//		});
		//		console.log("set");
		//		res.send("set");
		//	}
		//});
	});
};
