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
			echo "<input id='room' name='room' value=".code()." class='rounded'/>\n";
		}
	}
?>