

var words = ["walkers", "whispers", "hilltop", "saviors", "oceanside", "kingdom", "negan", "alpha", "rick", "glenn", "maggie", "daryl", "lucille", "woodbury"];
var messages = {
  win: "You win!",
  lose: "You lose. Try again.",
  guessedAlready: "Letter already used.",
  invalidLetter: "Letters Only",
}

var lives, letters, guessButton, hangman, msg, guess, currentGuess, lettersChosen, correctLetters, availableLetters, answer, numCorrectLetters;
var wins = 0;
var losses = 0;
document.getElementById("win-counter").innerHTML = wins;
document.getElementById("losses-counter").innerHTML = losses;

function setupGame(){
  answer = words[Math.floor(Math.random()*words.length)];
  lives = 10;
  
  letters = document.getElementById('letters');
  letters.innerHTML = '<li class="answer">Current Word: </li>'
  
  var letter;
   lettersChosen = '';
   correctLetters = '';
    availableLetters = "abcdefghijklmnopqrstuvwxyz";
    numCorrectLetters = 0;
  
  for (var i = 0; i < answer.length; i++){
    letter = '<li class="letter letter' + answer.charAt(i).toUpperCase() +
      '">' + answer.charAt(i).toUpperCase() + '</li>';
    letters.insertAdjacentHTML('beforeend', letter);
  }

  hangman = document.getElementById("hangman");
  hangman.innerHTML = "You have " + lives + " lives remaining";
  
  guess = document.getElementById("letter");
  guessButton = document.getElementById("guess");
  
  document.getElementById("letter").value = '';
  
  msg = document.getElementById("msg");
  msg.innerHTML = '';
  guessButton.style.display = 'inline';
  guess.style.display = 'inline';
}
window.onload = setupGame();
 guess.onclick = function () {
 this.value = '';
};
document.getElementById("restart").onclick = setupGame;

function gameOver(win){
  if (win){
       msg.innerHTML = messages.win;
    wins++;
    document.getElementById("win-counter").innerHTML = wins;
    msg.classList.add('won');
  } else {
    msg.classList.add('error');
    msg.innerHTML = messages.lose;
    losses++;
    document.getElementById("losses-counter").innerHTML = losses;
      
      }
  
  guess.style.display = guessButton.style.display = 'none';
  guess.value = '';
}

document.getElementById("hmform").onsubmit = function(e) {
    if (e.preventDefault) e.preventDefault();
    msg.innerHTML = '';
  msg.classList.remove('error', 'warning');
  currentGuess = guess.value;
  if (currentGuess){
    
    if (lettersChosen.indexOf(currentGuess) > -1){
      msg.classList.add('warning');
      msg.innerHTML = messages.guessedAlready;
      
    } else
     { 
      if (availableLetters.indexOf(currentGuess) > -1){
        lettersChosen += currentGuess;
        if (answer.indexOf(currentGuess) > -1){
          var displayLetters = document.querySelectorAll('.letter' + currentGuess.toUpperCase());
          for (var i = 0; i < displayLetters.length; i++){
            displayLetters[i].classList.add('correct');
          }
          for (var j = 0; j < answer.length; j++){
            if (answer.charAt(j) === currentGuess){
              numCorrectLetters++;
            }
          }
          correctLetters += currentGuess;
          if (numCorrectLetters === answer.length){
            gameOver(true);
          }
          
        } else { 
          lives--;
          hangman.innerHTML = "You have " + lives + " lives remaining";
          if (lives === 0) gameOver();
        }
        
      } else { 
        msg.classList.add('warning');
        msg.innerHTML = messages.invalidLetter;
      }
      
    }
  } else { 
    msg.classList.add('warning');
    msg.innerHTML = messages.invalidLetter;
  }
  
}




  