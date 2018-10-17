import Hangman from "./hangman"
import getPuzzle from "./request"
const puzzleElement = document.querySelector(".puzzle");
const guessesElement = document.querySelector("#guesses");
const guessedLettersElement = document.querySelector(".guessed-letters");
let game1;

window.addEventListener("keypress", (event) => {
    if (event.charCode != 32) {
        const guess = String.fromCharCode(event.charCode);
        console.log(event, document.querySelector("#mobile").value);
        event, document.querySelector("#mobile").value = "";
        game1.makeGuess(guess);
        render();
    }
})

const startGame = async () => {
    const puzzle = await getPuzzle("3");
    game1 = new Hangman(puzzle, 5);
    render();
}
const render = () => {
    puzzleElement.innerHTML = "";
    guessesElement.textContent = game1.statusMessage

    game1.puzzle.split("").forEach((letter) => {
        if (letter != " ") {
            const letterElement = document.createElement("span");
            letterElement.textContent = letter;
            puzzleElement.appendChild(letterElement);
        } else {
            const letterElement = document.createElement("div");
            letterElement.classList.add("divider");
            letterElement.textContent = letter;
            puzzleElement.appendChild(letterElement);
        }
    });
    guessedLettersElement.innerHTML = "";
    game1.guessedLetters.forEach(letter => {
        if (letter != "") {
            const guessedletter = document.createElement("span");
            guessedletter.textContent = letter;
            guessedLettersElement.appendChild(guessedletter);
        }
    });

}
startGame();
document.querySelector("#reset").addEventListener("click", startGame);