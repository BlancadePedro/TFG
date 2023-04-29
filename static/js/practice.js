const exerciseData = document.getElementById('exercise-data');
let currentWord = 0;
const index = parseInt(exerciseData.getAttribute('data-index'));
let updateCurrentGame;

document.addEventListener('DOMContentLoaded', () => {
    
    if (index === 1) {
        initHangMan();
    }
    if (index === 2) {
        initMemory();
    }
    if (index === 3) {
        initTicTacToe();
    }
    if (index === 4) {
        initTwister();
    }
    if (index === 5) {
        initPhotos();
    }
    if (index === 6) {
        initError();
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
        <button type="button" class="btn btn-outline-blue-700" onclick="stay()">Continuar jugando</button>
        <button type="button" class="btn btn-outline-blue-700" onclick="leave()">Abandonar el juego</button>
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

function initTicTacToe() {
    const IMG_X = exerciseData.getAttribute('data-x');
    const IMG_O = exerciseData.getAttribute('data-o');

    const board = document.getElementById('tic-tac-toe-board');
    const cells = [];

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.classList.add('d-flex', 'justify-content-center');

        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('tic-tac-toe-cell', 'border', 'border-dark', 'text-center', 'rounded');
            cell.setAttribute('tabindex', '0');
            cell.addEventListener('keydown', handleCellKeyDown);
            cell.style.width = '7.5em';
            cell.style.height = '7.5em';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.dataset.player = '';

            cell.addEventListener('click', handleCellClick);

            row.appendChild(cell);
            cells.push(cell);
        }

        board.appendChild(row);
    }

    function handleCellClick(event) {
        const cell = event.target;

        if (!cell.dataset.player) {
            makeMove(cell, 'X');
            if (!checkWin('X')) {
                makeComputerMove();
            }
        }
    }

    function makeComputerMove() {
        const emptyCells = cells.filter(cell => !cell.dataset.player);
    
        if (emptyCells.length) {
            let moveMade = false;
    
            // 1. Check if the computer can win in the next move
            const computerWinMove = findWinningMove('O');
            if (computerWinMove) {
                makeMove(computerWinMove, 'O');
                moveMade = true;
                if (checkWin('O')) {
                    showModal(`¡EL JUGADOR Computer GANA!`);
                    return;
                }
            }
    
            // 2. Check if the player can win in the next move and block it
            if (!moveMade) {
                const playerWinMove = findWinningMove('X');
                if (playerWinMove) {
                    makeMove(playerWinMove, 'O');
                    moveMade = true;
                    if (checkWin('O')) {
                        showModal(`¡EL JUGADOR Computer GANA!`);
                        return;
                    }
                }
            }
    
            // 3. Make a random move
            if (!moveMade) {
                const updatedEmptyCells = cells.filter(cell => !cell.dataset.player);
                if (updatedEmptyCells.length) {
                    const randomIndex = Math.floor(Math.random() * updatedEmptyCells.length);
                    const randomCell = updatedEmptyCells[randomIndex];
                    makeMove(randomCell, 'O');
                    if (checkWin('O')) {
                        showModal(`¡EL JUGADOR Computer GANA!`);
                    } else if (cells.every(cell => cell.dataset.player)) {
                        showModal("EMPATE");
                    }
                }
            }
        }
    }
        
    function findWinningMove(player) {
        for (const cell of cells) {
            if (!cell.dataset.player) {
                cell.dataset.player = player;
                const win = checkWin(player);
                cell.dataset.player = '';
                if (win) {
                    return cell;
                }
            }
        }
        return null;
    }

    function makeMove(cell, player) {
        // Realizar el movimiento y actualizar la celda
        cell.style.backgroundImage = `url('${player === 'X' ? IMG_X : IMG_O}')`;
        cell.style.backgroundSize = "cover";
        cell.dataset.player = player;
    
        // Verificar si hay una victoria real después de realizar el movimiento
        if (checkWin(player)) {
            showModal(`¡EL JUGADOR ${player === 'X' ? 'Player' : 'Computer'} GANA!`);
        } else if (cells.every(cell => cell.dataset.player)) {
            showModal("EMPATE");
        }
    }
    
    function checkWin(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            if (cells[combination[0]].dataset.player === player &&
                cells[combination[1]].dataset.player === player &&
                cells[combination[2]].dataset.player === player) {
                return true;
            }
        }

        return false;
    }

    function handleCellKeyDown(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row, 10);
        const col = parseInt(cell.dataset.col, 10);

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault(); // Evitar el comportamiento predeterminado de las teclas de flecha

            let newRow = row;
            let newCol = col;

            switch (event.key) {
                case 'ArrowUp':
                    newRow = row > 0 ? row - 1 : 2;
                    break;
                case 'ArrowDown':
                    newRow = row < 2 ? row + 1 : 0;
                    break;
                case 'ArrowLeft':
                    newCol = col > 0 ? col - 1 : 2;
                    break;
                case 'ArrowRight':
                    newCol = col < 2 ? col + 1 : 0;
                    break;
            }

            // Enfocar la celda en la nueva posición
            cells[newRow * 3 + newCol].focus();
        } else if (event.key === ' ' || event.key === 'Enter') {
            // Seleccionar la celda con la tecla de espacio o Enter
            if (!cell.dataset.player) {
                cell.click(); // Simular un clic en la celda
            }
        }
    }
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
    hangmanWord.setAttribute('aria-label', `Palabra oculta con ${word.length} letras`); // Agrega el atributo aria-label
    updateHangmanBoard(currentIndex);

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.classList.add("form-control", "m-2", "fs-4", "col-4", "text-center");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Comprobar";
    submitButton.classList.add("btn", "btn-outline-indigo-600", "m-2", "fs-4", "col-lg-4", "col-sm-1");

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

                if (attempts > states.length -1) {
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
        hangmanBoard.innerHTML = `<img src="${img}" class="object-fit-cover img-fluid text-center" width="400em" alt="Hangman Image" aria-label = "Número de fallos ${attempts}">`;
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
        hangmanWord.setAttribute('aria-label', `Palabra oculta con ${word.length} letras: ${hiddenWord}`);
        updateHangmanBoard(currentIndex); // Actualiza el tablero de ahorcado
        inputField.remove();
        submitButton.remove();
        hangmanInputContainer.innerHTML = '';
        $("#nextModal").modal('hide'); // Oculta el modal
    }
    updateCurrentGame = () => updateHangman(words);
}    

////////////////////////////////////////////////////////////////

function initMemory() {
    const board = document.getElementById("memory-board");
    const IMG_BACK = exerciseData.getAttribute("data-back");
    const cells = [];
  
    const state = {
      gameStarted: false,
      flippedCards: 0,
      totalFlips: 0,
      firstCard: null,
      secondCard: null,
      preventClick: false,
    };
  
    const dim = 4;
    const photos = JSON.parse(
      exerciseData.getAttribute("data-photos").replace(/'/g, '"')
    );
  
    let shuffledPhotos = shufflePhotos(photos);
  
    for (let i = 0; i < 4; i++) {
        const row = document.createElement("div");
        row.classList.add("d-flex", "justify-content-center");
      
        for (let j = 0; j < 4; j++) {
          const cell = document.createElement("div");
          cell.classList.add(
            "memory-cell",
            "border",
            "border-dark",
            "text-center",
            "rounded"
          );
          cell.style.width = "8em";
          cell.style.height = "8em";
          cell.style.backgroundImage = `url('${IMG_BACK}')`;
          cell.style.backgroundSize = "contain"; // Cambia "cover" a "contain"
          cell.style.backgroundRepeat = "no-repeat"; // Agrega esta línea para evitar que la imagen se repita
          cell.style.backgroundPosition = "center"; // Agrega esta línea para centrar la imagen en la celda
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.dataset.player = "";
          cell.setAttribute("tabindex", "0");
          cell.dataset.photo = shuffledPhotos[i * dim + j];
      
          cell.addEventListener("click", handleCellClick);
          cell.addEventListener("keydown", handleCellKeydown);

          row.appendChild(cell);
          cells.push(cell);
        }
      
        board.appendChild(row);
      }
        
    function shufflePhotos(photos) {
      const duplicatedPhotos = photos.concat(photos);
      for (let i = duplicatedPhotos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicatedPhotos[i], duplicatedPhotos[j]] = [
          duplicatedPhotos[j],
          duplicatedPhotos[i],
        ];
      }
      return duplicatedPhotos;
    }
  
    function handleCellClick(event) {
      if (state.preventClick) return;
  
      const cell = event.target;
      const photo = cell.dataset.photo;
  
      if (cell.classList.contains("flipped")) return;
  
      cell.style.backgroundImage = `url('${photo}')`;
      cell.classList.add("flipped");
  
      if (!state.firstCard) {
        state.firstCard = cell;
      } else {
        state.secondCard = cell;
        state.preventClick = true;
        state.totalFlips++;
  
        if (state.firstCard.dataset.photo === state.secondCard.dataset.photo) {
          state.flippedCards += 2;
  
          if (state.flippedCards === dim * dim) {
            showModal(`¡Ganaste! Realizaste ${state.totalFlips} intentos.`);
          }
  
          state.firstCard = null;
          state.secondCard = null;
          state.preventClick = false;
        } else {
          setTimeout(() => {
            state.firstCard.style.backgroundImage = `url('${IMG_BACK}')`;
            state.secondCard.style.backgroundImage = `url('${IMG_BACK}')`;
            state.firstCard.classList.remove("flipped");
            state.secondCard.classList.remove("flipped");
  
            state.firstCard = null;
            state.secondCard = null;
            state.preventClick = false;
          }, 1000);
        }
      }
    }

    function handleCellKeydown(event) {
        if (event.key === "Enter" || event.key === " ") {
            handleCellClick(event);
        }
    }
}

////////////////////////////////////////////////////////////////
let moveCounter = 0;

let lastLimb = null;
let lastColor = null;

function initTwister() {
  const board = document.getElementById('twister-board');
  const leftColumn = document.getElementById('left-column');
  const centerColumn = document.getElementById('center-column');
  const rightColumn = document.getElementById('right-column');

  function createCircle(color, imagePath, number) {
    const circle = document.createElement('div');
    circle.classList.add(
      'circle',
      color,
      'border',
      'border-dark',
      'rounded-circle',
      'mx-1',
      'my-1'
    );
    circle.style.width = '7vw';
    circle.style.height = '7vw';
    circle.style.backgroundImage = `url(${imagePath})`;
    circle.style.backgroundSize = 'cover';
    circle.classList.add('object-fit-cover', 'img-fluid');
    circle.innerHTML = number;

    circle.ondragover = (event) => {
      event.preventDefault();
    };

    circle.ondrop = (event) => {
      event.preventDefault();
    };

    return circle;
  }

   // Botón "Girar"
   const spinButton = document.createElement('button');
   spinButton.innerHTML = 'Girar';
   spinButton.classList.add("btn", "btn-outline-indigo-600", "m-2", "fs-4", "col-8");
   spinButton.addEventListener('click', spin);
   centerColumn.appendChild(spinButton);
    
    // Crear el tablero de Twister
    const colors = ['red', 'blue', 'yellow', 'green'];
    const number = ['1', '2', '3', '4'];
    const images = {
        red: exerciseData.getAttribute('data-red'),
        blue: exerciseData.getAttribute('data-blue'),
        green: exerciseData.getAttribute('data-green'),
        yellow: exerciseData.getAttribute('data-yellow'),
    };

    for (let row = 0; row < 4; row++) {
        const circleRow = document.createElement('div');
        const currentColor = colors[row];
        const currentNumber = number[row];
        const imagePath = images[currentColor];
        circleRow.classList.add('row', 'align-text-center')
        for (let col = 0; col < 6; col++) {
            const circle = createCircle(currentColor, imagePath, currentNumber);
            circleRow.appendChild(circle);
        }
        centerColumn.appendChild(circleRow);
    }


    function addBodyPartImage(column, part) {
        const img = document.createElement('img');
        img.src = exerciseData.getAttribute(`data-${part}`);
        img.classList.add('draggable', part, 'contain', 'object-fit-contain', 'img-fluid', 'tex-center');
        img.style.width = '75%';
        img.style.height = '75%';
        img.draggable = true;
        img.addEventListener('dragstart', onDragStart);
        column.appendChild(img);
    }

    addBodyPartImage(leftColumn, 'left');
    addBodyPartImage(rightColumn, 'right');

    function onDragStart(e) {
        const draggedLimb = e.target.classList[1];
        if (draggedLimb === lastLimb) {
          e.dataTransfer.setData('text/plain', draggedLimb);
        } else {
          e.preventDefault();
        }
    }

    
    function spin() {
        if (moveCounter < 10) {
            const colors = ['red', 'blue', 'yellow', 'green'];
            const limbs = ['left', 'right'];
        
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomLimb = limbs[Math.floor(Math.random() * limbs.length)];
        
            lastLimb = randomLimb; // Guardar el último miembro seleccionado
            lastColor = randomColor; // Guardar el último color seleccionado

            // Mostrar el modal con la información
            if(randomLimb === 'left'){
                if(randomColor === 'red'){
                    showModalNext(`Mover la figura situada en la izquierda hacia un círculo de color rojo (1)`, moveCounter + 1); 
                }
                if(randomColor === 'blue'){
                    showModalNext(`Mover la figura situada en la izquierda hacia un círculo de color azul (2)`, moveCounter + 1); 
                }
                if(randomColor === 'yellow'){
                    showModalNext(`Mover la figura situada en la izquierda hacia un círculo de color amarillo (3)`, moveCounter + 1); 
                }
                if(randomColor === 'green'){
                    showModalNext(`Mover la figura situada en la izquierda hacia un círculo de color verde (4)`, moveCounter + 1); 
                }
            }
            else{
                if(randomColor === 'red'){
                    showModalNext(`Mover la figura situada en la derecha hacia un círculo de color rojo (1)`, moveCounter + 1); 
                }
                if(randomColor === 'blue'){
                    showModalNext(`Mover la figura situada en la derecha hacia un círculo de color azul (2)`, moveCounter + 1); 
                }
                if(randomColor === 'yellow'){
                    showModalNext(`Mover la figura situada en la derecha hacia un círculo de color amarillo (3)`, moveCounter + 1); 
                }
                if(randomColor === 'green'){
                    showModalNext(`Mover la figura situada en la derecha hacia un círculo de color verde (4)`, moveCounter + 1); 
                }

            }
            
            const circles = document.querySelectorAll(`.circle.${randomColor}`);
            for (const circle of circles) {
                circle.removeEventListener('dragover', onDragOver);
                circle.removeEventListener('drop', onDrop);
                circle.addEventListener('dragover', onDragOver);
                circle.addEventListener('drop', (e) => onDrop(e, randomLimb, randomColor));
            }

            moveCounter++;
            } else {
                showModal('La partida ya se ha acabado');
            }
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    function onDrop(e, limb, color) {
        e.preventDefault();
        const draggedLimb = e.dataTransfer.getData('text/plain');
        console.log(draggedLimb)
        if (draggedLimb === limb) {
          const img = document.createElement('img');
          img.src = exerciseData.getAttribute(`data-${limb}`);
          img.classList.add('placed', limb, 'contain', 'object-fit-contain', 'img-fluid');
          img.style.width = '100%';
          img.style.height = '100%';
          const colorClass = Array.from(e.target.classList).find((c) =>
            colors.includes(c)
          );
          if (colorClass === color) {
            // Seleccionar todas las imágenes añadidas en e.target
            const addedImages = e.target.querySelectorAll('.placed');

            // Si hay imágenes añadidas, seleccionar la última
            if (addedImages.length > 0) {
            const lastAddedImage = addedImages[addedImages.length - 1];

            // Realizar acciones con la última imagen añadida
            console.log('Última imagen añadida:', lastAddedImage);
            e.target.appendChild(lastAddedImage);
            }
            else{ e.target.appendChild(img);}
           
          }
        }
    }
      
}

///////////////////////////////////////////////////////////////////

function initPhotos() {
    const board = document.getElementById("photos-board");
    const imgData = JSON.parse(exerciseData.getAttribute("data-photos").replace(/'/g, '"'));
    console.log(imgData);

    const images = imgData;

    let currentRound = 0;
    let selectedCellIndex = 0;
    let selectedWord; // Mover la declaración de selectedWord aquí
    let words; // Mover la declaración de words aquí
    const cells = [];

    function startRound(round) {

        if (round >= images.length) {
            showModal('¡Ha terminado el juego! ¿Desea continuar jugando?');
            return;
        }

        words = images[round].map(image => image.word);
        selectedWord = words[Math.floor(Math.random() * words.length)];

        // Vaciar la lista de celdas y restablecer el índice de la celda seleccionada al comienzo de cada ronda
        cells.length = 0;
        selectedCellIndex = 0;

        board.innerHTML = '';

        const wordContainer = document.createElement('h2');
        wordContainer.innerText = selectedWord;
        board.appendChild(wordContainer);

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.style.display = 'flex'; // Añade estilo flex para mostrar las imágenes en línea
        imgContainer.style.flexWrap = 'wrap'; // Permite que las imágenes se envuelvan en múltiples líneas si no hay suficiente espacio

        board.appendChild(imgContainer);

        for (const image of images[round]) {
            // Crear un nuevo elemento img y contenedor
            const imgElement = document.createElement('img');
            const imgCell = document.createElement('div');

            // Establecer las propiedades del elemento img y contenedor
            imgElement.src = image.src;
            imgElement.classList.add('exercise-image', 'border', "border-dark",'p-4' ,'rounded');
            imgElement.alt = image.word;

            imgCell.style.width = '25%'; // Ajusta el ancho de los elementos imgCell según el número de imágenes que se mostrarán en una fila
            imgCell.setAttribute("tabindex", "0");
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'contain'; // Ajusta la imagen para que se ajuste al tamaño de la celda sin recortarse

            imgCell.appendChild(imgElement);
            imgContainer.appendChild(imgCell);

            imgCell.addEventListener("keydown", handleCellKeydown);
            cells.push(imgCell);

            imgElement.onclick = () => {
                if (image.word === selectedWord) {
                    showModalNext('¡Acertaste!', round + 1);
                } else {
                    showModalNext('Fallaste!', round + 1);
                }
                startRound(round + 1);

            };
        }

        selectCell(cells[0]);
    }

    function selectCell(cell) {
        if (cell) { // Asegurarse de que la celda no esté indefinida antes de enfocarla
            cell.focus();
        }
    }

    function handleCellKeydown(event) {
        const currentCell = event.target;
        let nextCell;
    
        switch (event.key) {
            case "ArrowUp":
                nextCell = currentCell.previousElementSibling;
                break;
            case "ArrowDown":
                nextCell = currentCell.nextElementSibling;
                break;
            case "ArrowLeft":
                nextCell = currentCell.previousSibling;
                break;
            case "ArrowRight":
                nextCell = currentCell.nextSibling;
                break;
            case "Enter":
                const selectedImageWord = currentCell.firstChild.alt; // Obtener la palabra de la imagen seleccionada usando el atributo alt
                if (selectedImageWord === selectedWord) {
                    showModalNext('¡Acertaste!', currentRound + 1);
                } else {
                    showModalNext('Fallaste!', currentRound + 1);
                }
                currentRound++; // Actualizar currentRound antes de llamar a startRound
                startRound(currentRound);
                return;
            default:
                return;
        }
    
        if (nextCell && nextCell.firstChild instanceof HTMLImageElement) {
            selectedCellIndex = cells.indexOf(nextCell);
            selectCell(nextCell);
        }
    }
    
    

    startRound(currentRound);
}

///////////////////////////////////////////////////////////////////


function initError() {
    
    const letters = JSON.parse(exerciseData.getAttribute('data-letters').replace(/'/g, '"'));
    let currentIndex = 0;

    const wordContainer = document.getElementById("word-container");
    const choicesContainer = document.getElementById("choices-container");

    function displayCurrentWord() {
        if (currentIndex >= letters.length) {
            showModal('¡Ha terminado el ejercicio! ¿Desea continuar jugando?');
            return;
        }

        const currentExercise = letters[currentIndex];
        const word = Object.keys(currentExercise)[0];
        const shuffledLetters = currentExercise[word];
        const userAnswer = [];

        wordContainer.innerHTML = '';
        choicesContainer.innerHTML = '';

        shuffledLetters.forEach((letter, index) => {
            const button = document.createElement("button");
            button.textContent = letter;
            button.classList.add("btn", "btn-outline-indigo-700", "mt-3","fs-4", "letter-button");
            button.setAttribute('data-letter-index', index);
            console.log(word)
            button.setAttribute('data-reordered', word);

            button.addEventListener("click", () => {
                button.disabled = true;

                userAnswer.push(letter);

                wordContainer.innerHTML = userAnswer.join('');
                wordContainer.classList.add("fs-2");

                if (userAnswer.length === shuffledLetters.length) {
                    const userAnswerString = userAnswer.join('');
                    console.log(userAnswerString);

                    if (userAnswerString === word) {
                        // El usuario acertó
                        
                        showModalNext('¡Acertaste!', currentIndex + 1);

                    } else {
                        // El usuario falló
                        
                        showModalNext(`Fallaste!, la palabra era ${word}`, currentIndex + 1);
                    }

                    currentIndex++; // Incrementa currentIndex para pasar al siguiente ejercicio
                    displayCurrentWord(); // Agregar esta línea para pasar al siguiente ejercicio

                }
            });

            choicesContainer.appendChild(button);
        });
    }

    displayCurrentWord();
}



function showModalNext(msg, round) {
    const modalContainer = document.getElementById("modal-container");
    const modalHTML = `
    <div class="modal-content">
      <div class="modal-header bg-blue-blue-100">
        <h5 class="modal-title text-blue-blue-700" id="nextModalLabel">Ronda ${round}</h5>
      </div>
      <div class="modal-body">
        <p>${msg}</p>
      </div>
      <div class="modal-footer text-center bg-blue-blue-100">
        <button type="button" class="btn btn-outline-blue-700" data-bs-dismiss="modal">Continuar con la siguiente ronda</button>
      </div>
    </div>
    `;
    modalContainer.innerHTML = modalHTML;
    $("#nextModal").modal('show');

}


