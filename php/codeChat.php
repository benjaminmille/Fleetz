<?php
	function code() {
		$characts    = 'abcdefghijklmnopqrstuvwxyz';
		$characts   .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';	
		$characts   .= '1234567890'; 
		$code        = ''; 

		for($i=0;$i < 10;$i++)
		{ 
			$code .= substr($characts,rand()%(strlen($characts)),1); 
		}
		
		return $code;
	}
	
	function inputCode() {
		if (isset($_GET['room'])) {
			echo "<input type='hidden' id='room' name='room' value=".$_GET['room']." class='rounded' />\n";
		} else {
			echo "<input type='hidden' id='room' name='room' value=".code()." class='rounded'/>\n";
		}
	}
	
	function divCode() {
		$html = '<div align="right"><table><td><div class="fb-share-button" data-layout="button"></div></td><td><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://fleetmobz.com/fleetz/" data-size="large" data-count="none">Tweet</a></td></table></div>';
		if (isset($_GET['room'])) {
			echo "<span class='name'>Welcome to the room, please sign in</span>".$html;
		} else {
			echo "<span class='name'>Welcome to Fleetz, create your own room</span>".$html;
		}
	}
?>