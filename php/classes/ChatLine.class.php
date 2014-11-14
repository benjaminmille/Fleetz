<?php

/* Chat line is used for the chat entries */

class ChatLine extends ChatBase{
	
	protected $text = '', $author = '';
	public $room = '';
	
	public function save(){
		DB::query("
			INSERT INTO webchat_lines (author, text, room)
			VALUES (
				'".DB::esc($this->author)."',
				'".DB::esc($this->text)."',
				'".DB::esc($this->room)."'
		)");
		
		// Returns the MySQLi object of the DB class
		
		return DB::getMySQLiObject();
	}
}

?>