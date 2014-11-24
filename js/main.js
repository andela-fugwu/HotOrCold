new_game =  function(){
	
	valid_guess = 0,
	hidden_number = Math.floor(100*Math.random()),
	computer_present = 0,
	computer_previous = 101;

	document.getElementById('man').style.marginLeft = 0;
	document.getElementById('Action').innerHTML = "Guess";
	document.getElementById('counter').innerHTML = "0";
	document.getElementById('hotter_colder').innerHTML = "Waiting for your guess!";
	document.getElementById('guess').value = ""
	document.getElementById('man').src = "img/neither.jpg";
}

set_image = function(img_url){
	document.getElementById('man').style.marginLeft = (100-computer_present) * 2.08 + "px";
	document.getElementById('man').src = img_url;
}

validate_guess = function(user_guess){
	if((typeof user_guess === typeof 1) && ( user_guess <=100 && user_guess >= 0) ){
		document.getElementById('guess').value = "";
		return true;
	}
	return false;
}

guess = function(){
	if(document.getElementById('Action').innerHTML == "New Game")
		new_game();
	else{
		var user_guess = parseInt(document.getElementById('guess').value);
		if (validate_guess(user_guess)){
			valid_guess = user_guess;
			if(compare_guess()){
				document.getElementById('hotter_colder').innerHTML = "You guessed it right!";
				document.getElementById('Action').innerHTML = "New Game";
			}
			else{
				document.getElementById('hotter_colder').innerHTML = compare_previous();
				computer_previous = computer_present;
				document.getElementById('counter').innerHTML = (parseInt(document.getElementById('counter').innerHTML)+1).toString();
			}
		} else 
		document.getElementById('hotter_colder').innerHTML ="invalid input";
	}
}

compare_guess = function(){
	computer_present = Math.abs(hidden_number-valid_guess);
	
	if(valid_guess === hidden_number) {
		set_image("img/neither.jpg");
		return true;
	}
	return false;
}

compare_previous = function(){
	computer_present = Math.abs(hidden_number-valid_guess);

	if( computer_present === computer_previous ){
		set_image("img/neither.jpg");
		return "Neither cold nor hot";

	} else if (computer_present > computer_previous){
		set_image("img/walking_back.jpg");
		return "you are getting colder";
	}

	set_image("img/walking_front.jpg");
	return "you are getting hotter";
}

new_game();
document.getElementById('Action').addEventListener("click", guess);
document.getElementById('left').addEventListener("click", new_game);
