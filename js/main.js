var button = document.getElementById('Action'),
output =  document.getElementById('hotter_colder'),
guess_input = document.getElementById('guess'),
counter = document.getElementById('counter'),
man_image = document.getElementById('man'),
new_button = document.getElementById('left'),

guess_count = 0,
valid_guess = 0,
hidden_number = Math.floor(100*Math.random()),
computer_present = 0,
computer_previous = 101;

var init = function() {
	button = document.getElementById('Action');
	output =  document.getElementById('hotter_colder');
	guess_input = document.getElementById('guess');
	counter = document.getElementById('counter');
	man_image = document.getElementById('man');
	new_button = document.getElementById('left');

	guess_count = 0;
	valid_guess = 0;
	hidden_number = Math.floor(100*Math.random());
	computer_present = 0;
	computer_previous = 101;
}
	
new_game =  function(){
	guess_count = valid_guess = computer_present = 0;
	man_image.style.marginLeft = 0;
	computer_previous = 101;
	hidden_number = Math.floor(100*Math.random());
	button.innerHTML = "Guess";
	counter.innerHTML = "0";
	output.innerHTML = "Waiting for your guess!";
	guess_input.value = ""
}

validate_guess = function(user_guess){
	if((typeof user_guess === typeof 1) && ( user_guess <=100 && user_guess >= 0) ){
		guess_input.value = "";
		return true;
	}
	return false;
}

guess = function(){
	if(button.innerHTML == "New Game")
		new_game();
	else{
		var user_guess = parseInt(guess_input.value);
		if (validate_guess(user_guess)){
			valid_guess = user_guess;
			if(compare_guess()){
				output.innerHTML = "You guessed it right!";
				button.innerHTML = "New Game";
			}
			else{
				output.innerHTML = compare_previous();
				computer_previous = computer_present;
				counter.innerHTML = (parseInt(counter.innerHTML)+1).toString();
			}
		} else 
		output.innerHTML ="invalid input";
	}
},

compare_guess = function(){
	computer_present = Math.abs(hidden_number-valid_guess);
	
	if(valid_guess === hidden_number) {
		man_image.style.marginLeft = (100-computer_present) * 2.08 + "px";
		man_image.src = "img/neither.jpg";
		return true;
	}
	return false;
}

compare_previous = function(){
	computer_present = Math.abs(hidden_number-valid_guess);

	if( computer_present === computer_previous ){
		man_image.src = "img/neither.jpg";
		return "Neither cold nor hot";

	} else if (computer_present > computer_previous){
		man_image.src = "img/walking_back.jpg";
		man_image.style.marginLeft = (100-computer_present) * 2.08 + "px";
		return "you are getting colder";
	}

	man_image.src = "img/walking_front.jpg";
	man_image.style.marginLeft = (100-computer_present) * 2.08 + "px";
	return "you are getting hotter";
}


button.addEventListener("click", guess);
new_button.addEventListener("click", new_game);
