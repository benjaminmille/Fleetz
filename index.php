<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>F13372 &#124; Room</title>
		<link rel="stylesheet" type="text/css" href="js/jScrollPane/jScrollPane.css" />
		<link rel="stylesheet" type="text/css" href="css/page.css" />
		<link rel="stylesheet" type="text/css" href="css/chat.css" />
		<?php include('php/codeChat.php'); ?>
	</head>

	<body>
		<div id="chatContainer">
			<div id="chatTopBar" class="rounded">
				<span class="name">Sign in</span>
			</div>
			<div id="chatLineHolder"></div>
			
			<div id="chatUsers" class="rounded"></div>
			<div id="chatBottomBar" class="rounded">
				<div class="tip"></div>
				
				<form id="loginForm" method="post" action="">
					<input id="name" name="name" class="rounded" maxlength="16" />
					<input id="email" name="email" class="rounded" />
					<?php inputCode(); ?>
					<input type="submit" class="blueButton" value="Login"/>
				</form><br>
				
				<form id="chatOptions" method="post" action="">
					<input id="time" name="time" class="rounded"/>
					<input id="usersmax" name="usersmax" class="rounded" />
				</form>

				<form id="submitForm" method="post" action="">
					<input id="chatText" name="chatText" class="rounded" maxlength="255" />
					<input type="submit" class="blueButton" value="Submit" />
					<a href="#?w=500" rel="popup_name" class="poplight">
						<input class="blueButton" id="shareButton" type="button" value="Share"/>
					</a>
				</form>
			</div>
		</div>
		
		<div id="popup_name" class="popup_block"></div>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
		<script src="js/jScrollPane/jquery.mousewheel.js"></script>
		<script src="js/jScrollPane/jScrollPane.min.js"></script>
		<script src="js/script.js"></script>
	</body>

<footer>
	<h3>&copy; BenBen & Badaah </h3>
</footer>

</html>
