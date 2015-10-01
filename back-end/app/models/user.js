var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

/*
var taskSchema = mongoose.Schema({
	group: String,
	taskName: String,
	description: String,
	image: String,
	map: String,
	dueDateTime: Date,
	stat: String
});
*/

var userSchema = mongoose.Schema({
		local: {
			username: String,
			email: String,
			password: String
			//task: [taskSchema]
		}
});

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
