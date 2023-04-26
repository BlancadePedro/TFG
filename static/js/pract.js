const exerciseData = document.getElementById('exercise-data');
let currentWord = 0;
const index = parseInt(exerciseData.getAttribute('data-index'));
let updateCurrentGame;

document.addEventListener('DOMContentLoaded', () => {
    
    if (index === 1) {
        initHangMan();
    }
    if (index === 3) {
        initTicTacToe();
    }
});

function showModal(msg) {
    const modalContainer = document.getElementById("modal-container");
    const modalHTML = `
    <div class="modal-content">
      <div class="modal-header bg-blue-blue-100">
        <h5 class="modal-title text-blue-blue-700" id="nextModalLabel">¡Ha terminado el juego!</h5>
      </div>
      <div class="modal-body">
        <p>${msg}</p>
      </div>
      <div class="modal-footer text-center bg-blue-blue-100">
        <button type="button" class="btn btn-outline-blue-700" onclick="stay()">Continuar</button>
        <button type="button" class="btn btn-outline-blue-700" onclick="leave()">Abandonar</button>
      </div>
    </div>
    `;
    modalContainer.innerHTML = modalHTML;
    $("#nextModal").modal('show');

}

function stay() {
    if (index === 1){
        updateCurrentGame();
        currentWord++;
        initHangMan();
    }
    else{
        location.reload();
    }
}

function leave() {
    window.location.href = '/practice';
}

////////////////////////////////////////////////////////////////

function initHangMan() {
    const words = JSON.parse(exerciseData.getAttribute('data-words').replace(/'/g, '"'));
    let currentIndex = 0;
    const states = JSON.parse(exerciseData.getAttribute('data-states').replace(/'/g, '"'));
    let attempts = 0;
    const hangmanWord = document.getElementById('hang-man-word');
    const hangmanBoard = document.getElementById('hang-man-board');
    const hangmanLetters = document.getElementById('hang-man-letters');

    const word = words[currentWord % words.length].toUpperCase();
    console.log(word)
    const hiddenWord = Array(word.length).fill('_').join(' ');

    hangmanWord.textContent = hiddenWord;
    updateHangmanBoard(currentIndex);

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.classList.add("form-control");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Enviar";
    submitButton.classList.add("btn", "btn-outline-indigo-600", "m-2", "fs-4", "col-4");

    const hangmanInputContainer = document.getElementById('hangman-input-container');
    hangmanInputContainer.appendChild(inputField);
    hangmanInputContainer.appendChild(submitButton);

    submitButton.addEventListener('click', () => {
        const input = inputField;
        const letter = input.value.toUpperCase();

        if (letter.length !== 1 || !letter.match(/[A-Z]/i)) {
            alert('Por favor, introduce una única letra.');
            return;
        }

        if (!hangmanLetters.textContent.includes(letter)) {
            if (word.includes(letter)) {
                const updatedWord = hangmanWord.textContent
                    .split(' ')
                    .map((char, index) => (word[index] === letter ? letter : char))
                    .join(' ');

                hangmanWord.textContent = updatedWord;

                if (updatedWord === word.split('').join(' ')) {
                    showModal("¡Felicidades! Has adivinado la palabra.");
                    return;
                }
            } else {
                hangmanLetters.textContent += letter + ' ';
                attempts++;

                if (attempts === states.length) {
                    showModal(`Se han acabado los intentos, la palabra era ${word}`);
                    return;
                }

                currentIndex = attempts;
                updateHangmanBoard(currentIndex);
            }
        } else {
            alert('Ya has ingresado esta letra. Por favor, ingrese una letra diferente.');
        }

        input.value = '';
    });

    function updateHangmanBoard(index) {
        const img = Object.values(states[index])[0];
        hangmanBoard.innerHTML = `<img src="${img}" class="object-fit-cover img-fluid text-center" width="250em" alt="Hangman Image">`;
    }

    function updateHangman(words) {
        currentWord++;
        currentWord %= words.length; // Asegura que vuelva al primer elemento al llegar al último
        attempts = 0; // Restablece los intentos

        currentIndex = 0; // Restablece el índice
        hangmanLetters.textContent = ''; // Limpia las letras ingresadas
        const word = words[currentWord].toUpperCase(); // Obtiene la nueva palabra
        const hiddenWord = Array(word.length).fill('_').join(' '); // Crea la nueva palabra oculta
        hangmanWord.textContent = hiddenWord; // Actualiza la palabra en la pantalla
        updateHangmanBoard(currentIndex); // Actualiza el tablero de ahorcado
        inputField.remove();
        submitButton.remove();
        hangmanInputContainer.innerHTML = '';
        $("#nextModal").modal('hide'); // Oculta el modal
    }
    updateCurrentGame = () => updateHangman(words);
}    
