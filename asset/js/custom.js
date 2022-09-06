// custom js
$(document).ready(function () {


	$('.checkText').hide();
	$(document).on('change', '.input-checkbox input[type=checkbox]', function () {
		$(this).parents('.input-checkbox').siblings().find('input[type=checkbox]').prop('checked', false);
		$(this).siblings('.checkText').show();
		$(this).parents('.input-checkbox').siblings().find('.checkText').hide();
	});

	// document ready end 
});

$('#loginForm').submit(function (e) {
	e.preventDefault();
	const username = $('#username').val();
	const password = $('#password').val();

	if (!username || !password) {
		$('.msg-error').show();
		return;
	}

	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbzkjSD78kGFh_K2Ndq4O0JAFZ_qPxsP89ywnTV30u9cn5aTyl0213NTPl-DDlIVWz3V/exec',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		crossDomain: true,
		type: "POST",
		dataType: "json",
		data: {
			action: "login",
			username: username,
			password: password
		},
		success: function (res) {
			console.log(res)
			if (res.check) {
				sessionStorage.setItem("isLogged", res.check)
				window.location.href = "admin.html"
			} else {
				$('.msg-error').show();
			}
		},
		error: function (err) {
			$('.msg-error').show();
			console.log(err);
		}
	});
})

$('#logout').click(function () {
	sessionStorage.clear()
	window.location.href = "index.html"
})

$('#userList').ready(function(){
	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbzkjSD78kGFh_K2Ndq4O0JAFZ_qPxsP89ywnTV30u9cn5aTyl0213NTPl-DDlIVWz3V/exec',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		crossDomain: true,
		type: "POST",
		dataType: "json",
		data: {
			action: "getUsers",
		},
		success: function (res) {
			console.log(res)
			document.getElementById("userList").innerHTML = `
			<tr>
				<th>Email</th>
				<th>Passwords</th>
				<th>History</th>
				<th></th>
			</tr>` + res.map((el)=>{
				return el[5]!="YES" ? `
					<tr>
						<td>${el[1]}</td>
						<td>${el[2]}</td>
						<td>${el[3]}</td>
						<td>
							<button onClick="delUser(${el[0]})" class="tb-btn delete">
								<span class="icon">
									<img src="asset/img/Icon-feather-trash.png" alt="Trash"/>
								</span>
							</button>
						</td>
					</tr>` : ""
			}).join("")
		},
		error: function (err) {
			$('.msg-error').show();
			console.log(err);
		}
	});
})

$('#addUserForm').submit(function (e) {
	e.preventDefault();

	const data = {
		action: "addUser",
		email: $('#addEmail').val(),
		password: $('#addPassword').val(),
		history: $('#addHistory').val(),
		ips: $('#addIps').val(),
	}

	if (!data.email || !data.password || !data.history) {
		$('.msg-error').show();
		return;
	}

	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbzkjSD78kGFh_K2Ndq4O0JAFZ_qPxsP89ywnTV30u9cn5aTyl0213NTPl-DDlIVWz3V/exec',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		crossDomain: true,
		type: "POST",
		dataType: "json",
		data: data,
		success: function (res) {
			console.log(res)
			if (res.status == "done") {
				
				window.location.reload()
			} else {
				$('.msg-error').show();
			}
		},
		error: function (err) {
			$('.msg-error').show();
			console.log(err);
		}
	});
})

function delUser(delID){
	const data = {
		action: "delUser",
		delID: delID,
	}

	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbzkjSD78kGFh_K2Ndq4O0JAFZ_qPxsP89ywnTV30u9cn5aTyl0213NTPl-DDlIVWz3V/exec',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		crossDomain: true,
		type: "POST",
		dataType: "json",
		data: data,
		success: function (res) {
			console.log(res)
			if (res.status == "done") {
				
				window.location.reload()
			} else {
				$('.msg-error').show();
			}
		},
		error: function (err) {
			$('.msg-error').show();
			console.log(err);
		}
	});
}