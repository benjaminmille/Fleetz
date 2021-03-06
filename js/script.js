$(document).ready(function(){
	// Run the init method on document ready:
	chat.init();
});

var chat = {	
	
	// data holds variables for use in the class:
	
	data : {
		lastID 		: 0,
		noActivity	: 0,
		timeIsOut   : false
	},
	
	// Init binds event listeners and sets up timers:
	
	init : function(){
		
		// Déconnexion du chat lorsque la page est quittée
		$(window).bind('beforeunload', function() {
			$.tzPOST('logout');
		});
		
		// Using the defaultText jQuery plugin, included at the bottom:
		$('#name').defaultText('Name');
		$('#email').defaultText('Email');
		$('#room').defaultText('Room code');
		$('#time').defaultText('Logout in');
		$('#usersmax').defaultText('Number of users');
		
		// Converting the #chatLineHolder div into a jScrollPane,
		// and saving the plugin's API in chat.data:
		
		chat.data.jspAPI = $('#chatLineHolder').jScrollPane({
			verticalDragMinHeight: 12,
			verticalDragMaxHeight: 12
		}).data('jsp');
		
		// We use the working variable to prevent
		// multiple form submissions:
		
		var working = false;
		
		// Logging a person in the chat:
		
		$('#loginForm').submit(function(){
			if(working) return false;
			working = true;
			
			// Using our tzPOST wrapper function
			// (defined in the bottom):
			
			$.tzPOST('login',$(this).serialize(),function(r){
				working = false;
				
				if(r.error){
					chat.displayError(r.error);
				}
				else chat.login(r.name,r.room);
			});
			
			chat.timeout();
			
			return false;
		});
		
		// Submitting a new chat entry:
		
		$('#submitForm').submit(function(){
			
			var text = $('#chatText').val();
			
			if(text.length == 0){
				return false;
			}
			
			if(working) return false;
			working = true;
			
			// Assigning a temporary ID to the chat:
			var tempID = 't'+Math.round(Math.random()*1000000),
				params = {
					id			: tempID,
					author		: chat.data.name,
					text		: text.replace(/</g,'&lt;').replace(/>/g,'&gt;')
				};

			// Using our addChatLine method to add the chat
			// to the screen immediately, without waiting for
			// the AJAX request to complete:
			
			chat.addChatLine($.extend({},params));
			
			// Using our tzPOST wrapper method to send the chat
			// via a POST AJAX request:
			
			$.tzPOST('submitChat',$(this).serialize(),function(r){
				working = false;
				
				$('#chatText').val('');
				$('div.chat-'+tempID).remove();
				
				params['id'] = r.insertID;
				chat.addChatLine($.extend({},params));
			});
			
			return false;
		});
		
		// Lorsque vous cliquez sur un lien de la classe poplight et que le href commence par #
		
		$('a.poplight[href^=#]').click(function() {
			var popID = $(this).attr('rel'); //Trouver la pop-up correspondante
			var popURL = $(this).attr('href'); //Retrouver la largeur dans le href

			// Récupérer les variables depuis le lien
			
			var query = popURL.split('?');
			var dim = query[1].split('&amp;');
			var popWidth = dim[0].split('=')[1]; //La première valeur du lien

			// Faire apparaitre la pop-up et ajouter le bouton de fermeture
			
			$('#' + popID).fadeIn().css({
				'width': Number(popWidth)
			})
			.prepend('<a href="#" class="close"><img src="img/close_pop.png" class="btn_close" title="Fermer" alt="Fermer" /></a>');

			// Récupération du margin, qui permettra de centrer la fenêtre - on ajuste de 80px en conformité avec le CSS
			
			var popMargTop = ($('#' + popID).height() + 80) / 2;
			var popMargLeft = ($('#' + popID).width() + 80) / 2;

			// On affecte le margin
			
			$('#' + popID).css({
				'margin-top' : -popMargTop,
				'margin-left' : -popMargLeft
			});

			// Effet fade-in du fond opaque
			
			$('body').append('<div id="fade"></div>'); // Ajout du fond opaque noir
			
			// Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
			
			$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

			return false;
		});

		// Fermeture de la pop-up et du fond
		
		$('a.close, #fade').live('click', function() { // Au clic sur le bouton ou sur le calque...
			$('#fade , .popup_block').fadeOut(function() {
				$('#fade, a.close').remove();  // Ils disparaissent ensemble
			});
			return false;
		});
		
		// Logging the user out:
		
		$('a.logoutButton').live('click',function(){
			chat.logout();
			$.tzPOST('logout');
			
			return false;
		});
		
		// Checking whether the user is already logged (browser refresh)
		
		$.tzGET('checkLogged',function(r){
			if(r.logged){
				chat.login(r.loggedAs.name,r.loggedAs.room);
			}
		});
		
		// Self executing timeout functions
		
		(function getChatsTimeoutFunction(){
			chat.getChats(getChatsTimeoutFunction);
		})();
		
		(function getUsersTimeoutFunction(){
			chat.getUsers(getUsersTimeoutFunction);
		})();
		
	},
	
	// The login method hides displays the
	// user's login data and shows the submit form
	
	login : function(name,room){
		chat.data.name = name;
		chat.data.room = room;
		
		$('#chatTopBar').html(chat.render('loginTopBar',chat.data));
		
		$('#loginForm').fadeOut(function(){
			$('#submitForm').fadeIn();
			$('#chatText').focus();
		});
		
		$('#popup_name').html(chat.render('popup', chat.data));
	},
	
	// La méthode logout masque la barre du haut du chat
	// et le champs de message
	
	logout : function() {
				
		$('#chatTopBar > span').fadeOut(function(){
			$(this).remove();
			$('a.logoutButton').fadeOut();
			$('#chatTopBar').html('<span class="name">Sign in</span>');
		});
		
		$('#submitForm').fadeOut(function(){
			$('#loginForm').fadeIn();
			chat.data.jspAPI.getContentPane().html('<p class="noChats">Empty</p>');
		});
		
		chat.data.jspAPI.reinitialise();
		chat.data.jspAPI.scrollToBottom(true);
		
		return false;
	},
	
	// La méthode timeout démarre un minuteur avec la durée choisie
	// avant déconnexion à la fin du temps
	// et vérifie le temps de connexion restant toute les 60 s
	// et l'affiche sur la barre du haut du chat
	
	timeout : function() {
		chat.data.timeIsOut = false;
		chat.data.time = $('#time').val();
		setTimeout('chat.logout(); chat.data.timeIsOut = true;', chat.data.time*60000);
		var timer = setInterval(function(){
			if(!chat.data.timeIsOut){
				chat.data.time = chat.data.time-1;
				$('#chatTopBar').html(chat.render('loginTopBar',chat.data));
			} else {
				chat.logout();
				$.tzPOST('logout');
				clearInterval(timer);
			}
		}, 60000);
	},
	
	// The render method generates the HTML markup 
	// that is needed by the other methods:
	
	render : function(template,params){
		
		var arr = [];
		switch(template){
			case 'popup':
				arr = [
					'<h2>Share the chat room</h2><br/>',
					'<input size="65" id="roomLink" name="roomLink" class="rounded" value="',window.location.href,'?room=',params.room,'"/>'];
			break;
			
			case 'loginTopBar':
				arr = [
					'<span class="name">Logged as <strong>',params.name,'</strong></span>',
					'<span class="time">',params.time,' min before</span>',
					'<a href="" class="logoutButton rounded">Log out</a>'];
			break;
			
			case 'chatLine':
				arr = [
					'<div class="chat chat-',params.id,' rounded">',
					'</span><span class="author">',params.author,
					':</span><span class="text">',params.text,'</span><span class="time">',params.time,'</span></div>'];
			break;
			
			case 'user':
				arr = [
					'<div class="user" title="',params.name,'"></div>'
				];
			break;
		}
		
		// A single array join is faster than
		// multiple concatenations
		
		return arr.join('');
		
	},
	
	// The addChatLine method ads a chat entry to the page
	
	addChatLine : function(params){
		
		// All times are displayed in the user's timezone
		
		var d = new Date();
		if(params.time) {
			
			// PHP returns the time in UTC (GMT). We use it to feed the date
			// object and later output it in the user's timezone. JavaScript
			// internally converts it for us.
			
			d.setUTCHours(params.time.hours,params.time.minutes);
		}
		
		params.time = (d.getHours() < 10 ? '0' : '' ) + d.getHours()+':'+
					  (d.getMinutes() < 10 ? '0':'') + d.getMinutes();
		
		var markup = chat.render('chatLine',params),
			exists = $('#chatLineHolder .chat-'+params.id);

		if(exists.length){
			exists.remove();
		}
		
		if(!chat.data.lastID){
			// If this is the first chat, remove the
			// paragraph saying there aren't any:
			
			$('#chatLineHolder p').remove();
		}
		
		// If this isn't a temporary chat:
		if(params.id.toString().charAt(0) != 't'){
			var previous = $('#chatLineHolder .chat-'+(+params.id - 1));
			if(previous.length){
				previous.after(markup);
			}
			else chat.data.jspAPI.getContentPane().append(markup);
		}
		else chat.data.jspAPI.getContentPane().append(markup);
		
		// As we added new content, we need to
		// reinitialise the jScrollPane plugin:
		
		chat.data.jspAPI.reinitialise();
		chat.data.jspAPI.scrollToBottom(true);
		
	},
	
	// This method requests the latest chats
	// (since lastID), and adds them to the page.
	
	getChats : function(callback){
		$.tzGET('getChats',{lastID: chat.data.lastID},function(r){
			
			for(var i=0;i<r.chats.length;i++){
				chat.addChatLine(r.chats[i]);
			}
			
			if(r.chats.length){
				chat.data.noActivity = 0;
				chat.data.lastID = r.chats[i-1].id;
			}
			else{
				// If no chats were received, increment
				// the noActivity counter.
				
				chat.data.noActivity++;
			}
			
			if(!chat.data.lastID){
				chat.data.jspAPI.getContentPane().html('<p class="noChats">Empty</p>');
			}
			
			// Setting a timeout for the next request,
			// depending on the chat activity:
			
			var nextRequest = 500;
			
/* 			// 2 seconds
			if(chat.data.noActivity > 3){
				nextRequest = 2000;
			}
			
			if(chat.data.noActivity > 10){
				nextRequest = 5000;
			}
			
			// 15 seconds
			if(chat.data.noActivity > 20){
				nextRequest = 15000;
			} */
		
			setTimeout(callback,nextRequest);
		});
	},
	
	// Requesting a list with all the users.
	
	getUsers : function(callback){
		$.tzGET('getUsers',function(r){
			
			var users = [];
			
			for(var i=0; i< r.users.length;i++){
				if(r.users[i]){
					users.push(chat.render('user',r.users[i]));
				}
			}
			
			var message = '';
			
			if(r.total<1){
				message = '0 user online';
			}
			else {
				message = r.total+' '+(r.total == 1 ? 'user':'users')+' online';
			}
			
			users.push('<p class="count">'+message+'</p>');
			
			$('#chatUsers').html(users.join(''));
			
			setTimeout(callback,15000);
		});
	},
	
	// This method displays an error message on the top of the page:
	
	displayError : function(msg){
		var elem = $('<div>',{
			id		: 'chatErrorMessage',
			html	: msg
		});
		
		elem.click(function(){
			$(this).fadeOut(function(){
				$(this).remove();
			});
		});
		
		setTimeout(function(){
			elem.click();
		},5000);
		
		elem.hide().appendTo('body').slideDown();
	}
};

// Custom GET & POST wrappers:

$.tzPOST = function(action,data,callback){
	$.post('php/ajax.php?action='+action,data,callback,'json');
}

$.tzGET = function(action,data,callback){
	$.get('php/ajax.php?action='+action,data,callback,'json');
}

// A custom jQuery method for placeholder text:

$.fn.defaultText = function(value){
	
	var element = this.eq(0);
	element.data('defaultText',value);
	
	element.focus(function(){
		if(element.val() == value){
			element.val('').removeClass('defaultText');
		}
	}).blur(function(){
		if(element.val() == '' || element.val() == value){
			element.addClass('defaultText').val(value);
		}
	});
	
	return element.blur();
}