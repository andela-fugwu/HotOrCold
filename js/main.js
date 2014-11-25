// creates a new game object
var play_game = {

  //initializes game variables for a new game
  new_game: function() { 
    this.valid_guess = 0,
    this.hidden_number = Math.floor(101*Math.random()),
    this.computer_present = 0,
    this.computer_previous = 101;

    document.getElementById('man').style.marginLeft = 0;
    document.getElementById('Action').innerHTML = "Guess";
    document.getElementById('counter').innerHTML = "0";
    document.getElementById('hotter_colder').innerHTML = "Waiting for your guess!";
    document.getElementById('guess').value = ""
    document.getElementById('man').src = "img/neither.jpg";
  },

  //validates the input a user entered
  validate_guess: function(user_guess) {
    if((typeof user_guess === typeof 1) && ( user_guess <=100 && user_guess >= 0) ){
      document.getElementById('guess').value = "";
      return true;
    }
    return false;
  },

  //sets the required image and margin for animation
  set_image: function(img_url) {
    document.getElementById('man').style.marginLeft = (100-this.computer_present) * 2.08 + "px";
    document.getElementById('man').src = img_url;
  },

  //checks whether a guess is right, hotter, colder or neither
  guess: function() {
    if(document.getElementById('Action').innerHTML == "New Game")
      this.new_game();
    else{
      var user_guess = parseInt(document.getElementById('guess').value);
      if (this.validate_guess(user_guess)){
        this.valid_guess = user_guess;
        if(this.compare_guess()){
          document.getElementById('hotter_colder').innerHTML = "You guessed it right!";
          document.getElementById('Action').innerHTML = "New Game";
        }
        else{
          document.getElementById('hotter_colder').innerHTML = this.compare_previous();
          this.computer_previous = this.computer_present;
          document.getElementById('counter').innerHTML = (parseInt(document.getElementById('counter').innerHTML)+1).toString();
        }
      } else 
      document.getElementById('hotter_colder').innerHTML ="Please enter a number between 0 and 100";
    }
  },

  //compares user guess with computers hidden number 
  compare_guess: function () {
    
    if(this.valid_guess === this.hidden_number) {
      this.computer_present = Math.abs(this.hidden_number-this.valid_guess);
      this.set_image("img/neither.jpg");
      return true;
    }
    return false;
  },

  //if guess is wrong checks whether guess is hotter, colder or neither
  compare_previous: function() {
    this.computer_present = Math.abs(this.hidden_number-this.valid_guess);

    if( this.computer_present === this.computer_previous ){
      this.set_image("img/neither.jpg");
      return "Neither cold nor hot";

    } else if (this.computer_present > this.computer_previous){
      this.set_image("img/walking_back.jpg");
      return "you are getting colder";
    }

    this.set_image("img/walking_front.jpg");
    return "you are getting hotter";
  },
};

//initializes a new game
play_game.new_game();

//binds functions to buttons
document.getElementById('Action').addEventListener("click", function (e) { 
  e.preventDefault();
  play_game.guess(); 
});
document.getElementById('left').addEventListener("click", function () { play_game.new_game(); });
