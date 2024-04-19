let word;
let attempts;

function startGame() {
    word = document.getElementById("wordInput").value.toLowerCase();
    attempts = document.getElementById("attemptInput").value;

    document.getElementById("inputPage").style.display = "none";
    document.getElementById("guessingPage").style.display = "block";

    document.getElementById("output").innerHTML = "";

    let guessForm = document.getElementById("guessForm");
    guessForm.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let inputBox = document.createElement("input");
        inputBox.setAttribute("type", "text");
        inputBox.setAttribute("maxlength", "1");
        inputBox.setAttribute("class", "letterInput");
        inputBox.setAttribute("id", "letter" + i);
        inputBox.setAttribute("oninput", "moveToNextBox(this, " + (i + 1) + ")");
        guessForm.appendChild(inputBox);
    }
    let submitButton = document.createElement("button");
    submitButton.setAttribute("type", "button"); 
    submitButton.textContent = "Guess";
    submitButton.setAttribute("onclick", "processGuess()"); 
    guessForm.appendChild(submitButton);
}

function moveToNextBox(currentInput, nextIndex) {
    if (currentInput.value && nextIndex < 5) {
        document.getElementById("letter" + nextIndex).focus();
    }
}

function processGuess() {
    let guess = "";
    for (let i = 0; i < 5; i++) {
        guess += document.getElementById("letter" + i).value;
    }
    let output = document.createElement("div");
    output.classList.add("output-container");
    let result = evaluateGuess(guess);
    for (let i = 0; i < 5; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.textContent = guess[i];
        if (result[i] === 1) {
            box.classList.add("correct-letter");
        } else if (result[i] === 0) {
            box.classList.add("wrong-position");
        } else {
            box.classList.add("not-in-word");
        }
        output.appendChild(box);
    }
    document.getElementById("output").appendChild(output);
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
    attempts--;
    if (guess === word) {
        endGame(true);
    } else if (attempts === 0) {
        endGame(false);
    }
    for (let i = 0; i < 5; i++) {
        document.getElementById("letter" + i).value = "";
    }
}

function evaluateGuess(guess) {
    let result = [];
    let unmatchedLetters = {}; 
    let guessedLetters = {}; 

    for (let letter of word) {
        unmatchedLetters[letter] = (unmatchedLetters[letter] || 0) + 1;
    }

    for (let i = 0; i < 5; i++) {
        if (guess[i] === word[i]) {
            result.push(1);
            unmatchedLetters[guess[i]]--;
        } else {
            result.push(-1);
            guessedLetters[guess[i]] = (guessedLetters[guess[i]] || 0) + 1;
        }
    }
   
    for (let i = 0; i < 5; i++) {
        if (result[i] === -1 && unmatchedLetters[guess[i]] && unmatchedLetters[guess[i]] > 0) {
            result[i] = 0;
            unmatchedLetters[guess[i]]--; 
        }
    }
    return result;
}



function endGame(isCorrect) {
    if (isCorrect) {
        alert("Congratulations! You guessed the word.");
    } else {
        alert("Out of attempts. The word was: " + word);
    }
}



function showRules() {
    alert("The rules of the game are:\n 1) One player has to enter a word and the number of attempts \n 2) Another player should guess the word \n 3)While guessing the word \n\tThe box with red border represents that the letter is not in the word \n\tThe box with the orange border represents that the letter is in the word but in a wrong position \n\tThe box with green background represents that the letter is in correct position");
}
