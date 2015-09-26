var User = require('./models/user');
module.exports = function(app){
	app.get('/', function(req, res){
		res.send("Hello world");
	});

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
}
