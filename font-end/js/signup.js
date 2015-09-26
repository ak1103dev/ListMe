$(document).ready(function() {
	$("form").submit(function(){
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

		//alert(usr + " " + email + " " + pwd + " " + conpwd);
		//alert(correctInput());
		if (correctInput()) {
			var url = "http://127.0.0.1:8080"
			//url += "/" + usr + "/" + email + "/" + pwd;

			$.get(url, function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);
			});
		}
		else {
			var message = "You should input correct data!!!";
			console.log(correctPassword);
			alert(message);
		}
	});
});
