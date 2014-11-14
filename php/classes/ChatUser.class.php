<?php

class ChatUser extends ChatBase{
	
	protected $name = '', $gravatar = '';
	public $room = '';
	
	public function save(){
		
		DB::query("
			INSERT INTO webchat_users (name, gravatar, room)
			VALUES (
				'".DB::esc($this->name)."',
				'".DB::esc($this->gravatar)."',
				'".DB::esc($this->room)."'
		)");
		
		return DB::getMySQLiObject();
	}
	
	public function update(){
		DB::query("
			INSERT INTO webchat_users (name, gravatar, room)
			VALUES (
				'".DB::esc($this->name)."',
				'".DB::esc($this->gravatar)."',
				'".DB::esc($this->room)."'
			) ON DUPLICATE KEY UPDATE last_activity = NOW()");
	}
}

?>