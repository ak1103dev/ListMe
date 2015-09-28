$(document).ready(function() {
	$("form").submit(function(e){
		e.preventDefault();

		var email = $('#email').val();
		var pwd = $('#pwd').val();
		var correctInput= function() {
			if (email === '' || pwd === '') {
				return false;
			}
			else {
				if (pwd.length < 8) {
					console.log("pass");
					return false;
				}
				else {
					return true;
				}
			}
		}

		if (correctInput()) {
			var url = "http://localhost:8080/login";
			var data = {
				email: email,
				password: pwd
			};
			$.post(url, data, function(res) {
				console.log(res);
				if (res == 'main')
					$(location).attr('href', './main.html');
				else
					alert("Incorrect E-mail or Password!!!");
			});
		}
		else {
			var message = "You should input correct data!!!";
			alert(message);
		}
	});
});
