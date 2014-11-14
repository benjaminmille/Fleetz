<?php

class ChatUser extends ChatBase{
	
	protected $name = '';
	public $room = '';
	
	public function save(){
		
		DB::query("
			INSERT INTO webchat_users (name, room)
			VALUES (
				'".DB::esc($this->name)."',
				'".DB::esc($this->room)."'
		)");
		
		return DB::getMySQLiObject();
	}
	
	public function update(){
		DB::query("
			INSERT INTO webchat_users (name, room)
			VALUES (
				'".DB::esc($this->name)."',
				'".DB::esc($this->room)."'
			) ON DUPLICATE KEY UPDATE last_activity = NOW()");
	}
}

?>