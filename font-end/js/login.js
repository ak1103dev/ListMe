$(document).ready(function() {
	$("form").submit(function(){
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
			//window.location.assign("http://www.w3schools.com")
			var url = "http://localhost:8080/login";
			var data = {
				email: email,
				password: pwd
			};
			$.post(url, data, function() {
				alert("login");
			});
		}
		else {
			var message = "You should input correct data!!!";
			alert(message);
		}
	});
});
