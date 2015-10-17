var express = require('express');
var app = express();
var port = process.env.PORT || 1103;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(function(request, response, next) {
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Authorization, Content-Type, Accept');
	next();
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret: 'anystringoftext',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
	console.log(req.cookies);
	console.log('==============');
	console.log(req.session);
	console.log('==============');
	console.log(req.user);
	next();
});

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server running on port: ' + port);
