const words = ["brownie", "cookie", "biscuit", "crepe", "jelly", "pie", "muffin", "macaroon", "milkshake", "donut", "candy", "cupcake", "lollipop", "waffle", "pancake", "mousse", "marshmllow", "mugcake", "pudding", "souffle", "sherbet", "scone", "smore", "toffee", "scone", "pie", "sundae", "fudge", "butterscotch", "chocolate", "caramel", "churro"];
const maxWrongGuesses = 6;

let selectedWord = words[Math.floor(Math.random() * words.length)];
let remainingGuesses = maxWrongGuesses;
let guessedLetters = [];

const wordDisplay = document.getElementById("word-display");
const guessesLeft = document.getElementById("guesses");
const wrongGuessDisplay = document.getElementById("wrong");
const hangmanImage = document.getElementById("hangman-image");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const imageContainer = document.getElementById("imageContainer");

function initializeGame() {
    guessedLetters = [];
    remainingGuesses = maxWrongGuesses;
    message.textContent = "";
    updateDisplay();
    setupKeyboard();
}

function updateDisplay() {
    let word = "";
    for (const letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            word += letter + " ";
        } else {
            word += "_ ";
        }
    }
    wordDisplay.textContent = word;
    guessesLeft.textContent = remainingGuesses;
    wrongGuessDisplay.textContent = guessedLetters.filter(letter => selectedWord.indexOf(letter) === -1).join(" ");
}

function checkWin() {
    if (wordDisplay.textContent.indexOf("_") === -1) {
        message.textContent = "Congratulations! You've won! Here's ur prize:";
        imageContainer.style.display = "block";
        disableKeyboard();
    }
}

function checkLose() {
    if (remainingGuesses === 0) {
        message.textContent = `Unlucky, game Over :c The word was "${selectedWord}".`;
        disableKeyboard();
    }
}

function updateHangmanImage() {
    hangmanImage.src = `hangman-${maxWrongGuesses - remainingGuesses}.svg`;
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter)) {
        message.textContent = "You've already guessed that letter.";
        setTimeout(() => {
            message.textContent = "";
        }, 2000); // Message disappears after 2 seconds
        return;
    }

    guessedLetters.push(letter);
    if (selectedWord.indexOf(letter) === -1) {
        remainingGuesses--;
        updateHangmanImage();
    }

    updateDisplay();
    checkWin();
    checkLose();
}

function disableKeyboard() {
    const letterButtons = document.querySelectorAll(".letter-button");
    letterButtons.forEach(button => button.disabled = true);
}

function setupKeyboard() {
    keyboard.innerHTML = '';
    const rows = 7; // Number of rows
    const columns = 6; // Number of columns

    keyboard.style.display = 'grid'; // Set the display property to 'grid'
    keyboard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`; // Define the number of columns
    keyboard.style.gridTemplateRows = `repeat(${rows}, 1fr)`; // Define the number of rows
    keyboard.style.placeItems = 'center'; // Center both horizontally and vertically

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement("button");
        button.textContent = letter;
        button.className = "letter-button";
        button.addEventListener("click", () => handleGuess(letter));

        if (letter === 'y') {
            button.style.gridColumn = '3'; // Center 'y' in columns 4 and 5
        } else if (letter === 'z') {
            button.style.gridColumn = '4'; // Center 'z' in columns 5 and 6
        }

        keyboard.appendChild(button);
    }
}

// Initialize the game
initializeGame();
