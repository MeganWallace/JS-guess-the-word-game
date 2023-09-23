// ======================== GLOBAL VARIABLES ========================
// list for guessed letters:
const guessedLettersList = document.querySelector(".guessed-letters");
// guess button:
const guessButton = document.querySelector(".guess");
// guess letter text input:
const letterInput = document.querySelector("#letter");
// word in progress paragraph:
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


// ===================== Placeholder Function for Word in Progress ===================== (Load function)
// (only used once at page load, replaced by showCorrectLetters function after first guess is submitted)
const placeholder = function (word) { //function to display placeholder symbols instead of letters for guess word
  const letters = []; //empty array to hold individual letters of word
  for (let letter of word) { //loops through each letter of word
    console.log(letter); //log out individual letters (*does not add them to empty array)
    letters.push("●"); //adds ● to empty array for each letter
  }
  wordProgress.innerText = letters.join(""); //combines elements of letters array, separated by "", into a string and displays them in the word-in-progress paragraph
};

placeholder(word); //calls placeholder function to display placeholder symbols in browser


// ===================== Event Listener for Guess Button ===================== (Primary function)
guessButton.addEventListener("click", function (e) {
  e.preventDefault(); //prevents the default form behavior of clicking a button, the form submitting, and then reloading the page...this allows the previously guessed letters to be kept
  const guess = letterInput.value; //captures the letter input box value
  letterInput.value = ""; //clears the letter input box

  message.innerText = ""; //clears the message paragraph
  const validationResult = validateInput(guess); //validates letter input from player and assigns variable to result
  // console.log(validationResult); //logs validation result (placeholder)

  if (validationResult) { //if guess is valid (ie. validation results in a letter, not undefined)
    makeGuess(guess); //run makeGuess function (ie. add to guessed letters list or show try again message)
  }
});


// ===================== Function to Validate Player's Input ===================== (Secondary function > guessButton click)
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

// ===================== Function to Hold Guessed Letters ===================== (Secondary function > guessButton click)
const makeGuess = function (guess) { //reuse "guess" variable from click event function
  guess = guess.toUpperCase(); //convert guess to uppercase

  if (guessedLetters.includes(guess)) { //if guessedLetters array includes the guess
    message.innerText = "You already guessed that letter! Try again."; //returns try again message
  } else {
    guessedLetters.push(guess); //otherwise guess is added to guessedLetters array
    console.log(guessedLetters); //log guessedLetters array

    showGuessedLetters(guess); //run showGuesses function (ie. display guessed letters in guessed letters list)
    showCorrectLetters(guessedLetters); //run showCorrectLetters function (replaces initial placeholder function)
  }
};

// ===================== Function to Display Guessed Letters ===================== (Tertiary function >> makeGuess)
const showGuessedLetters = function () {
  guessedLettersList.innerHTML = ""; //clear guessed letters list

  for (const letter of guessedLetters) { //loop through each letter in guessedLetters array
    let li = document.createElement("li"); //create a list item for letter
    li.innerText = letter; //set list item text value to letter
    guessedLettersList.append(li); //add list item to guessed letters list
  }
};

// ===================== Function to Update Word in Progress ===================== (Tertiary function >> makeGuess...replaces placeholder function)
const showCorrectLetters = function (guessedLetters) {
  const wordUpper = word.toUpperCase(); //convert word to uppercase
  const wordArray = wordUpper.split(""); //split word into array of individual letters
  // console.log(wordArray); //log out word array (placeholder)
  const correctLetters = []; //empty array to hold correctly guessed letters (to be revealed)
  for (let letter of wordArray) { //loops through each letter of word array
    if (guessedLetters.includes(letter)) { //checks if guessed letters array contains any word array letters
      correctLetters.push(letter); //if true, pushes letter to correctly letters array
    } else {
      correctLetters.push("●"); //if false, pushes ● placeholder to array
    }
    // } console.log(correctLetters); //logs correct letters array (placeholder)
  }
  wordProgress.innerText = correctLetters.join(""); //joins correct letters array into string and displays in browser (replacing initial placeholder function)
  checkWin(); //if word is correct, runs checkWin function
};

// ===================== Function to Check if Player Won ===================== (Quaternary function >>> showCorrectLetters)
const checkWin = function () {
  if (word.toUpperCase() === wordProgress.innerText){ //check if the word (JS is case sensitive, need to make upper) matches players word in progress (need to check actual text of wordProgress paragraph)
    message.classList.add("win"); //adds win class to message
    message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>' //updates message paragraph
  }
};