const puzzleElement = document.querySelector("#puzzle");
const guessesElement = document.querySelector("#guesses");
const game1 = new Hangman("cat", 2);
puzzleElement.textContent = game1.getPuzzle();
guessesElement.textContent = game1.remainingGuesses; 

window.addEventListener("keypress", function (event) {
    const guess = String.fromCharCode(event.charCode);
    game1.makeGuess(guess); 
    puzzleElement.textContent = game1.getPuzzle();
    guessesElement.textContent = game1.remainingGuesses; 
    console.log(game1.status);
})
