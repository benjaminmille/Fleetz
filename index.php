<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Fleetz &#124; Room</title>
		<link rel="stylesheet" type="text/css" href="js/jScrollPane/jScrollPane.css" />
		<link rel="stylesheet" type="text/css" href="css/page.css" />
		<link rel="stylesheet" type="text/css" href="css/chat.css" />
		<?php include('php/codeChat.php'); ?>
	</head>

	<body>
		<div id="fb-root"></div>
		<script>
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.0";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		</script>
		<script>
		!function(d,s,id){
			var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";
			if(!d.getElementById(id)){
				js=d.createElement(s);
				js.id=id;
				js.src=p+"://platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js,fjs);
			}
		}(document, "script", "twitter-wjs");
		</script>
		<div id="chatContainer">
			<div id="chatTopBar" class="rounded">
				<?php divCode(); ?>
			</div>
			<div id="chatLineHolder"></div>
			<div id="chatUsers" class="rounded">
			</div>
			<div id="chatBottomBar" class="rounded">
				<div class="tip"></div>
				
				<form id="loginForm" method="post" action="">
					<input id="name" name="name" class="rounded" maxlength="16" />
					<input id="email" name="email" class="rounded" />
					<input id="time" name="time" class="rounded"/>
					<?php inputCode(); ?>
					<input type="submit" class="blueButton" value="Login"/>
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
