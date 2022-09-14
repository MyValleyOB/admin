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
			if (res.check) {
				sessionStorage.setItem("isLogged", res.check)
				sessionStorage.setItem("user", username)
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
	if(!document.getElementById("userList")) return;
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
			document.getElementById("userList").innerHTML = `
			<tr>
				<th>Email</th>
				<th>Passwords</th>
				<th>History</th>
				<th></th>
			</tr>` + res.map((el)=>{
				return el[5]!="YES" ? `
					<tr class="user-item">
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

$('#receiptList').ready(function(){
	if(!document.getElementById("receiptList")) return;

	document.getElementById("receiptList").innerHTML = "<img class='mx-auto d-block' src='asset/img/logo.png'>"

	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbx30xCSu4aE4l2eAJpoSbo0vWsjc46g4GS3MGxfUjFZjCJOFGA0iEYdqgGdnI6fex2I/exec',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		crossDomain: true,
		type: "POST",
		dataType: "json",
		data: {
			action: "getReceipts",
		},
		success: function (res) {
			document.getElementById("receiptList").innerHTML = `
			<tr>
				<th>Receipt ID</th>
				<th>Date</th>
				<th>Amount</th>
				<th>Received By</th>
				<th class="text-center">Download</th>
				<th class="text-center">Action</th>
				<th class="text-center position-relative" style="min-width: 100px;">
						<button class="custom-btn popSubmit" style="
						position: absolute;
						top: 5px;
						left: 0;
						right: 0;
						margin: 0 auto;
						font-size: 14px;
						padding: 10px 20px;
						max-width: 130px;
						">
						Delete All
					</button>
				</th>
			</tr>` + res.map((el)=>{
				el[1] = new Date(el[1])
				return el[0]=="NO DATA" ? `<tr><td>NO RECEIPT FOUND</td></tr>` :`
					<tr class="receipt-item">
						<td>${el[2]}</td>
						<td>${(el[1].getMonth() + 1) + "-" + el[1].getDate() + "-" + el[1].getFullYear() }</td>
						<td>$${el[6]}</td>
						<td>${el[7]}</td>
						<td class="text-center">
							<button class="icon-btn download">
								<span class="icon">
									<img src="asset/img/download.png" alt="Download"/ class="iconBlack"/>
									<img src="asset/img/download-white.png" alt="Download"/ class="iconBlue">
								</span>
							</button>
						</td>
						<td class="text-center">
							<button class="icon-btn download">
								<span><img src="asset/img/view.png" alt="View"></span>
							</button>
						</td>
						<td class="text-center">
							<button class="tb-btn-smpl delete">
								<span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Trash"/></span>
							</button>
						</td>
					</tr>`
			}).join("")
		},
		error: function (err) {
			$('.msg-error').show();
			console.log(err);
		}
	});
})

$("#searchReceipts").keyup(function(e){
	$(".receipt-item").each(function(i, el){
		el.hidden = false;
	})
	let searchQuery = $("#searchReceipts").val();
	$(".receipt-item").each(function(i, el){
		if(!el.innerText.includes(searchQuery)){
			el.hidden = true;
		}
	})
})

$("#search-users").keyup(function(e){
	$(".user-item").each(function(i, el){
		el.hidden = false;
	})
	let searchQuery = $("#search-users").val();
	$(".user-item").each(function(i, el){
		if(!el.innerText.includes(searchQuery)){
			el.hidden = true;
		}
	})
})

$("#reportSubmit").click(function() {
	const startDate = $("#startDate").val();
	const endDate = $("#endDate").val();

	console.log(startDate)

	if(!startDate || !endDate || !sessionStorage.getItem("user").includes("@")) {
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
			action: "sendReport",
			startDate: startDate,
			endDate: endDate,
			email: sessionStorage.getItem("user")
		},
		success: function (res) {
			console.log(res)
			if (res.status == "done") {
				
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