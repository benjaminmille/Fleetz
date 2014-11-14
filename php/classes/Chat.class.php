<?php

/* The Chat class exploses public static methods, used by ajax.php */

class Chat{
	
	public static function login($name,$email,$room){
		if(!$name || !$email || !$room){
			throw new Exception('Fill in all the required fields.');
		}
		
		if(!filter_input(INPUT_POST,'email',FILTER_VALIDATE_EMAIL)){
			throw new Exception('Your email is invalid.');
		}
		
		$user = new ChatUser(array(
			'name'		=> $name,
			'room'      => $room
		));
		
		// The save method returns a MySQLi object
		if($user->save()->affected_rows != 1){
			throw new Exception('This nick is in use.');
		}
		
		$_SESSION['user']	= array(
			'name'		=> $name,
			'room'      => $room
		);
		
		return array(
			'status'	=> 1,
			'name'		=> $name,
			'room'      => $room
		);
	}
	
	public static function checkLogged(){
		$response = array('logged' => false);
			
		if($_SESSION['user']['name']){
			$response['logged'] = true;
			$response['loggedAs'] = array(
				'name'		=> $_SESSION['user']['name'],
				'room'      => $_SESSION['user']['room']
			);
		}
		
		return $response;
	}
	
	public static function logout(){
		DB::query("DELETE FROM webchat_users WHERE name = '".DB::esc($_SESSION['user']['name'])."' AND room = '".DB::esc($_SESSION['user']['room'])."'");
		DB::query("DELETE FROM webchat_lines WHERE author = '".DB::esc($_SESSION['user']['name'])."' AND room = '".DB::esc($_SESSION['user']['room'])."'");
		
		$_SESSION = array();
		unset($_SESSION);

		return array('status' => 1);
	}
	
	public static function submitChat($chatText){
		if(!$_SESSION['user']){
			throw new Exception('You are not logged in');
		}
		
		if(!$chatText){
			throw new Exception('You haven\' entered a chat message.');
		}
	
		$chat = new ChatLine(array(
			'author'	=> $_SESSION['user']['name'],
			'text'		=> $chatText,
			'room'      => $_SESSION['user']['room']
		));
	
		// The save method returns a MySQLi object
		$insertID = $chat->save()->insert_id;
	
		return array(
			'status'	=> 1,
			'insertID'	=> $insertID
		);
	}
	
	public static function getUsers(){
		if($_SESSION['user']['name']){
			$user = new ChatUser(array('name' => $_SESSION['user']['name']));
			$user->update();
		}
		
		// Deleting chats older than 5 minutes and users inactive for 30 seconds
		
		DB::query("DELETE FROM webchat_lines WHERE ts < SUBTIME(NOW(),'0:5:0') AND room = '".DB::esc($_SESSION['user']['room'])."'");
		DB::query("DELETE FROM webchat_users WHERE last_activity < SUBTIME(NOW(),'0:0:30') AND room = '".DB::esc($_SESSION['user']['room'])."'");
		
		$result = DB::query("SELECT * FROM webchat_users WHERE room = '".DB::esc($_SESSION['user']['room'])."' ORDER BY name ASC LIMIT 18");
		
		$users = array();
		while($user = $result->fetch_object()){
			$users[] = $user;
		}
	
		return array(
			'users' => $users,
			'total' => DB::query("SELECT COUNT(*) as cnt FROM webchat_users WHERE room = '".DB::esc($_SESSION['user']['room'])."'")->fetch_object()->cnt
		);
	}
	
	public static function getChats($lastID){
		$lastID = (int)$lastID;
	
		$result = DB::query("SELECT * FROM webchat_lines WHERE id > '.$lastID.' AND room = '".DB::esc($_SESSION['user']['room'])."' ORDER BY id ASC");
	
		$chats = array();
		while($chat = $result->fetch_object()){
			
			// Returning the GMT (UTC) time of the chat creation:
			
			$chat->time = array(
				'hours'		=> gmdate('H',strtotime($chat->ts)),
				'minutes'	=> gmdate('i',strtotime($chat->ts))
			);
			
			$chats[] = $chat;
		}
	
		return array('chats' => $chats);
	}
}


?>