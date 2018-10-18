import Hangman from "./hangman"
import getPuzzle from "./request"
const puzzleElement = document.querySelector(".puzzle");
const guessesElement = document.querySelector("#guesses");
const guessedLettersElement = document.querySelector(".guessed-letters");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");
const impossible = document.querySelector("#impossible");
const keyboard = document.querySelector(".keyboard");
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

// <input class="mobile-only" id="mobile" type="text">
window.addEventListener("keypress", (event) => {
    if (event.charCode != 32) {
        const guess = String.fromCharCode(event.charCode);
        game1.makeGuess(guess);
        render();
    }
})
//adding keyboard and functionality
for (let index = 0; index < 26; index++) {
    const key = document.createElement("button")
    const keyCode = 65 + index;
    key.textContent = String.fromCharCode(keyCode);
    key.addEventListener("click", event => {
        if ((keyCode) != 32) {
            const guess = String.fromCharCode(keyCode);
            game1.makeGuess(guess);
            render();
        }
    })
    if (keyCode != 89 && keyCode != 90) {
        key.classList.add("key-style");
    } else {

        key.classList.add("key-style", "last-key-style");
    }
    keyboard.appendChild(key);
}
//
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