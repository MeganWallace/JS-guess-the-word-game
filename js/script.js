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
const remainingGuessDisplay = document.querySelector(".remaining");
// remaining guesses counter span:
const guessCounter = document.querySelector(".remaining span");
// guess message paragraph:
const message = document.querySelector(".message");
// play again button:
const playAgain = document.querySelector(".play-again");

// word (this will change):
let word = "magnolia";
// empty array to hold guessed letters:
const guessedLetters = [];
// number of remaining guesses (8 is max, number will change over time):
let remainingGuesses = 8;


// ===================== Async Function to Fetch Words ===================== (Primary function)
const getWord = async function(){
  const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); //fetch words text file
  const words = await request.text(); //parse and hold text data (list of words)
  // console.log(words); //log out words
  const wordArray = words.split("\n"); //turn text data into an array...split() separates each word with a newline/line break ("\n")
  // console.log(wordArray); //log out word array

  const randomIndex = Math.floor(Math.random() * wordArray.length); //generates random index number from word array
  // console.log(randomIndex); //log out random index number
  word = wordArray[randomIndex].trim(); //pulls random word from word array and assigns it as word variable (word to be guessed)...trim() removes any whitespace
  // console.log(word); //log out random word
  placeholder(word); //applies placeholder function to random word (ie. replaces word letters with symbols)
};

getWord(); //launches new random word

// ===================== Placeholder Function for Word in Progress ===================== (Secondary function > getWord)
// (only used once on page load/new word, replaced by showCorrectLetters function after first guess is submitted)
const placeholder = function (word) { //function to display placeholder symbols instead of letters for guess word
  const letters = []; //empty array to hold individual letters of word
  for (let letter of word) { //loops through each letter of word
    console.log(letter); //log out individual letters (*does not add them to empty array)
    letters.push("●"); //adds ● to empty array for each letter
  }
  wordProgress.innerText = letters.join(""); //combines elements of letters array, separated by "", into a string and displays them in the word-in-progress paragraph
};

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
    updateRemainingGuesses(guess); //runs updateRemainingGuesses function (ie. update on screen guess counter)
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

// ===================== Function to Count Remaining Guesses ===================== (Tertiary function >> makeGuess)
const updateRemainingGuesses = function (guess){
  const upperWord = word.toUpperCase(); //convert word to uppercase for comparison

  if (!upperWord.includes(guess)){ //if word does not include guess:
    message.innerText = `Sorry, the word does not contain the letter ${guess}.`; //update message and...
    remainingGuesses -= 1; //...subtract 1 from remaining guesses value (don't need new variable because let was used)
  } else { //otherwise:
    message.innerText = `Great guess! The letter ${guess} is part of the word.`; //update message
  }

  if (remainingGuesses === 0){ //if remaining guesses is 0:
    message.innerText = `Game over! The word was ${word}.`; //show game over message and...
    guessCounter.innerText = `${remainingGuesses} guesses`; //...update guess counter and...
    startOver(); //...shows play again button to reset game
  } else if (remainingGuesses === 1) { //if remaining guesses is 1:
    guessCounter.innerText = `${remainingGuesses} guess`; //update guess counter
  } else { //otherwise:
    guessCounter.innerText = `${remainingGuesses} guesses`; //update guess counter
  }
};

// ===================== Function to Check if Player Won ===================== (Quaternary function >>> showCorrectLetters)
const checkWin = function () {
  if (word.toUpperCase() === wordProgress.innerText){ //check if the word (JS is case sensitive, need to make upper) matches players word in progress (need to check actual text of wordProgress paragraph)
    message.classList.add("win"); //adds win class to message
    message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>'; //updates message paragraph
    startOver(); //shows play again button to reset game
  }
};

// ===================== Function to Show Play Again Button/Reset Game ===================== (Quaternary/Quinary function >>> updateRemainingGuesses/checkWin)
const startOver = function(){
  guessButton.classList.add("hide"); //hides guess button
  remainingGuessDisplay.classList.add("hide"); //hides remaining guesses message
  guessedLettersList.classList.add("hide"); //hides guessed letters list

  playAgain.classList.remove("hide"); //displays play again button
}

