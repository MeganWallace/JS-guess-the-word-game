// ======================== GLOBAL VARIABLES ========================
// list for guessed letters:
const guessedLettersList = document.querySelector(".guessed-letters");
// guess button:
const guessButton = document.querySelector(".guess");
// guess letter text input:
const letterInput = document.querySelector("#letter");
// word progress paragraph:
const wordProgress = document.querySelector(".word-in-progress");
// remaining guesses counter paragraph:
const remainingGuesses = document.querySelector(".remaining");
// remaining guesses counter span:
const guessCounter = document.querySelector(".remaining span");
// guess message paragraph:
const message = document.querySelector(".message");
// play again button:
const playAgain = document.querySelector(".play-again");
// starting word:
const word = "magnolia";
// empty array to hold guessed letters
const guessedLetters = [];

// ===================== Placeholder Function for Word Letters =====================
const placeholder = function (word) { //function to display placeholder symbols instead of letters for guess word
  const letters = []; //empty array to hold individual letters of word
  for (let letter of word) { //loops through each letter of word
    console.log(letter); //log out individual letters (*does not add them to empty array)
    letters.push("●"); //adds ● to empty array for each letter
  }
  wordProgress.innerText = letters.join(""); //combines elements of letters array, separated by "", into a string and displays them in the word-in-progress paragraph
};

placeholder(word); //calls placeholder function to display placeholder symbols in browser


// ===================== Event Listener for Guess Button =====================
guessButton.addEventListener("click", function (e) {
  e.preventDefault(); //prevents the default form behavior of clicking a button, the form submitting, and then reloading the page...this allows the previously guessed letters to be kept
  const guess = letterInput.value; //captures the letter input box value
  letterInput.value = ""; //clears the letter input box

  message.innerText = ""; //clears the message paragraph
  const validationResult = validateInput(guess); //validates letter input from player and assigns variable to result
  // console.log(validationResult); //logs validation result (placeholder)

  if (validationResult){ //if guess is valid (ie. validation results in a letter, not undefined)
    makeGuess(guess); //run makeGuess function (ie. add to guessedLetters array or show try again message)
  }
});


// ===================== Function to Validate Player's Input =====================
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/; //specifies a pattern of only letters (*regular expression*)

  if (input === "") { //checks if input is empty
        // alt. solution code --> if (input.length === 0)
    message.innerText = "Please enter a guess."; //returns error message if true
  } else if (input.length > 1) { //checks if input has more than one character
    message.innerText = "Please only guess one letter at a time."; //returns error message if true
  } else if (input.match(acceptedLetter) === null) {  //checks if input doesn't match regular expression
        // alt. solution code --> else if (!input.match(acceptedLetter))
    message.innerText = "Please guess a letter from A to Z."; //returns error message if true
  } else {
    return input; //otherwise returns input
  }
};

// ===================== Function to Capture Guess Input =====================

const makeGuess = function(guess){ //reuse "guess" variable from click event function
  guess = guess.toUpperCase(); //convert guess to uppercase

  if (guessedLetters.includes(guess)){ //if guessedLetters array includes the guess
    message.innerText = "You already guessed that letter! Try again."; //returns try again message
  } else {
    guessedLetters.push(guess); //otherwise guess is added to guessedLetters array
    console.log(guessedLetters); //log guessedLetters array
  }
};
