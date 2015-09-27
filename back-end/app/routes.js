var User = require('./models/user');
module.exports = function(app){
	/*
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		if ('OPTIONS' == req.method) {
			res.send(200);
		}
		else {
			next();
		}
	});
	*/

	app.get('/', function(req, res){
		res.send("Hello world");
	});

	app.post('/signup', function (req, res) {
		var newUser = new User();
		newUser.local.username = req.body.username;
		newUser.local.email= req.body.email;
		newUser.local.password = req.body.password;
		newUser.save(function(err){
			if(err)
				throw err;
		});
		console.log("signup");
		//res.send("signup");
	});

	/*
	app.get('/:username/:email/:password', function(req, res){
		var newUser = new User();
		newUser.local.username = req.params.username;
		newUser.local.email= req.params.email;
		newUser.local.password = req.params.password;
		console.log(newUser.local.username + " " + newUser.local.password + " " + newUser.local.email);
		newUser.save(function(err){
		if(err)
			throw err;
		});
		res.send("Success!");
	})
	*/
}
