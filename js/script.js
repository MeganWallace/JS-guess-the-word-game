// ======================== GLOBAL VARIABLES ========================
// list for guessed letters:
const guessedLetters = document.querySelector(".guessed-letters");
//  Guess button:
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

// ===================== Placeholder Function for Guess Word Letters =====================
const placeholder = function (word) { //function to display placeholder symbols instead of letters for guess word
  const letters = []; //empty array to hold individual letters of word
  for (let letter of word) { //loops through each letter of word
    console.log(letter); //log out individual letters (*does not add them to empty array)
    letters.push("●"); //adds ● to empty array for each letter
  }
  wordProgress.innerText = letters.join(" "); //combines elements of letters array, separated by " ", into a string and displays them in the word-in-progress paragraph
};

placeholder(word); //calls placeholder function to display placeholder symbols in browser



