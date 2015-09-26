var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
		local: {
			username: String,
			email: String,
			password: String
		}
});

module.exports = mongoose.model('User', userSchema);
