<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>F13372 &#124; Room</title>
		<link rel="stylesheet" type="text/css" href="js/jScrollPane/jScrollPane.css" />
		<link rel="stylesheet" type="text/css" href="css/page.css" />
		<link rel="stylesheet" type="text/css" href="css/chat.css" />
		<script language="JavaScript">
			function logout() {
				$('#chatTopBar > span').fadeOut(function(){
					$(this).remove();
				});
				
				$('#submitForm').fadeOut(function(){
					$('#loginForm').fadeIn();
					$('#chatOptions').fadeIn();
					chat.data.jspAPI.getContentPane().html('<p class="noChats">Empty</p>');
				});
				
				$.tzPOST('logout');
				
				return false;
			}

			function timeout(time) {
				setTimeout('logout();', time*60000)
			}
		</script>
	</head>

<body>
	<div id="chatContainer">

		<div id="chatTopBar" class="rounded"></div>
		<div id="chatLineHolder"></div>
		
		<div id="chatUsers" class="rounded"></div>
		<div id="chatBottomBar" class="rounded">
			<div class="tip"></div>
			
			<form id="loginForm" method="post" action="">
				<input id="name" name="name" class="rounded" maxlength="16" />
				<input id="email" name="email" class="rounded" />
				<?php 
					if (isset($_GET['room'])) {
						echo "<input type='hidden' id='room' name='room' value=".$_GET['room']." class='rounded' />";
					} else {
						echo "<input id='room' name='room' class='rounded' />";
					}
				?>
				<input type="submit" class="blueButton" value="Login" onClick="javascript:timeout(document.getElementById('time').value);"/>
			</form><br>
			
			<form id="chatOptions" method="post" action="">
				<input id="time" name="time" class="rounded"/>
				<input id="usersmax" name="usersmax" class="rounded" />
			</form>
			
			<form id="submitForm" method="post" action="">
				<input id="chatText" name="chatText" class="rounded" maxlength="255" />
				<input type="submit" class="blueButton" value="Submit" />
			</form>
			</select>
			
		</div>
	</div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<script src="js/jScrollPane/jquery.mousewheel.js"></script>
	<script src="js/jScrollPane/jScrollPane.min.js"></script>
	<script src="js/script.js"></script>
</body>
<footer>
		<h3>&copy; BenBen & Badaah </h3>
</footer>
</html>
