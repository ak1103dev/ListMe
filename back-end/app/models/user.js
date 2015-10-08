var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var taskSchema = mongoose.Schema({
		name: String,
		description: String,
		image: String,
		map: String,
		due_date_time: Date,
		stat: String
});

var groupSchema = mongoose.Schema({
		name: String,
		task: [taskSchema]
});

var userSchema = mongoose.Schema({
	local: {
		username: String,
		email: String,
		password: String,
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String,
	},
	group: [groupSchema]
});

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
