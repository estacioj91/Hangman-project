import Hangman from "./hangman"
import getPuzzle from "./request"
const puzzleElement = document.querySelector(".puzzle");
const guessesElement = document.querySelector("#guesses");
const guessedLettersElement = document.querySelector(".guessed-letters");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");
const impossible = document.querySelector("#impossible");
var wordCount = "1"
let game1;


easy.addEventListener("click", (event) => {
    wordCount = "1";
    startGame();
})
medium.addEventListener("click", (event) => {
    wordCount = "2";
    startGame();
})
hard.addEventListener("click", (event) => {
    wordCount = "3";
    startGame();
})
impossible.addEventListener("click", (event) => {
    wordCount = "4";
    startGame();
})
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
    const puzzle = await getPuzzle(wordCount);
    game1 = new Hangman(puzzle, 5);
    document.querySelector(".img-src").src = "./assets/hangman-" + 0 + ".png";
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