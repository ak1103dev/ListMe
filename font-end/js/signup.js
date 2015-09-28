$(document).ready(function() {
	$("form").submit(function(e) {
		e.preventDefault();

		var usr = $('#usr').val();
		var email = $('#email').val();
		var pwd = $('#pwd').val();
		var conpwd = $('#conpwd').val();
		var correctPassword = true;
		var correctInput= function() {
			if (usr === '' || email === '' || pwd === '' || conpwd === '') {
				return false;
			}
			else {
				if (!(6 <= usr.length <= 8)) {
					console.log("usr");
					return false;
				}
				if (pwd.length < 8) {
					console.log("pass");
					return false;
				}
				if (pwd !== conpwd) {
					correctPassword = false;
					console.log("pass" + correctPassword);
					return false;
				}
				return true;
			}
		}

		if (correctInput()) {
			var url = "http://localhost:8080/signup";
			var data = {
				username: usr,
				email: email,
				password: pwd
			};
			$.post(url, data, function(res) {
				console.log(res);
				$(location).attr('href', './main.html);
			});
		}
		else {
			var message = "You should input correct data!!!";
			alert(message);
		}
	});
});
