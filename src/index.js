import Hangman from "./hangman"
import getPuzzle from "./request"
const puzzleElement = document.querySelector(".puzzle");
const guessesElement = document.querySelector("#guesses");
let game1;

window.addEventListener("keypress", (event) => {
    const guess = String.fromCharCode(event.charCode);
    game1.makeGuess(guess);
    render();
})

const startGame = async () => {
    const puzzle = await getPuzzle("2");
    game1 = new Hangman(puzzle, 5);
    render();
}
const render = () => {
    puzzleElement.innerHTML = "";
    guessesElement.textContent = game1.statusMessage

    game1.puzzle.split("").forEach((letter) => {
        const letterElement = document.createElement("span");
        letterElement.textContent = letter;
        puzzleElement.appendChild(letterElement);
    });
}
startGame();
document.querySelector("#reset").addEventListener("click", startGame);
