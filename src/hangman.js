class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split("");
        this.remainingGuesses = remainingGuesses;
        this.guessedLetters = [""];
        this.status = "playing";
    }
    calculateStatus() {
        const finished = this.word.every((letter) => {
            return this.guessedLetters.includes(letter) || letter === " ";
        })
        if (this.remainingGuesses === 0) {
            this.status = "failed";
        } else if (finished) {
            this.status = "finished";
        } else {
            this.status = "playing";
        }
    }
    get puzzle() {
        let puzzle = "";
        this.word.forEach(letter => {
            if (this.guessedLetters.includes(letter) || letter === " ") {
                puzzle = puzzle + letter;
            } else {
                puzzle = puzzle + "*";
            }
        });
        return puzzle;
    }
    get statusMessage() {
        if (this.status === "playing") {
            return `Guesses left: ${this.remainingGuesses}`;
        } else if (this.status === "failed") {
            return `Nice try! The word was "${this.word.join("")}"`;
        } else {
            return "Great Work!";
        }
    }
    makeGuess(guess) {
        guess = guess.toLowerCase();
        const isBadGuess = !this.word.includes(guess);
        const isUnique = !this.guessedLetters.includes(guess);
        if (this.status !== "playing") {
            return;
        }

        if (isUnique) {
            this.guessedLetters.push(guess);
        }
        if (isUnique && isBadGuess) {
            let count = (5 - (this.remainingGuesses - 1));
            document.querySelector(".img-src").src = "./assets/hangman-" + count + ".png";
            this.remainingGuesses--;
        }
        this.calculateStatus();
    }
}
export {
    Hangman as
    default
}