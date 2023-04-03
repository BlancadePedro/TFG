document.addEventListener('DOMContentLoaded', function () {
  
  const exerciseDataElement = document.getElementById("exercise-data");
  
  const index = parseInt(exerciseDataElement.dataset.index);
  const letters = JSON.parse(exerciseDataElement.dataset.letters.replace(/'/g, '"'));
  
  console.log("index: ", index)
  if (index > 0 && index < 14 || index > 17 && index < 22) {
    const dim = parseInt(exerciseDataElement.dataset.dim);
    const target = exerciseDataElement.dataset.target;
    console.log(target);
    createTableWithTargetLetter(letters, dim, target);
  } else if (index > 13 && index < 18) {
    const dim = parseInt(exerciseDataElement.dataset.dim);
    createTableWithoutTargetLetter(letters, dim);
  } else if (index === 22) {
    createMissingLetterExercise(letters);
  } else if (index === 23) {
    createExtraLetterExercise(letters);
  } else if (index === 24 || index === 25) {
    createErrorClickExercise(letters);
  } else if (index === 26) {
    createLetterCorrectionExercise(letters);
  } else if (index === 27|| index === 28) {
    createReorderLettersExercise(letters);
  } else if (index === 29) {
    createSeparateWordsExercise(letters);
  } else if (index === 30) {
    createSequenceExercise(letters);
  } else if (index === 31|| index === 32) {
    createAudioWordExercise(letters,index);
  } else {
    console.log("En progreso");
  }
  

  const timerElement = document.getElementById("timer");
  let timeLeft = 15;

  function updateTimer() {
    timerElement.textContent = timeLeft + " segundos";
  }

  if (![30, 31, 32].includes(index)) {
    updateTimer();

    const timerInterval = setInterval(() => {
      timeLeft--;
      updateTimer();

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        showModal(index, globalHits);
      }
    }, 1500);
  }
});

function next() {
  const exerciseDataElement = document.getElementById("exercise-index");
  const index = parseInt(exerciseDataElement.dataset.index, 10);
  if(index === 32)
  {
    window.location.href = '/prueba/results';
  }else{
    const exerciseIndex = index + 1;
    window.location.href = '/prueba/instructions/' + exerciseIndex;
  }
}

function showModal(index, globalHits) {
  const modalContainer = document.getElementById("modal-container");
  const modalHTML = `
  <div class="modal-content">
    <div class="modal-header bg-blue-blue-100">
      <h5 class="modal-title text-blue-blue-700" id="nextModalLabel">Se acabó el tiempo</h5>
    </div>
    <div class="modal-body">
      <h5>Ha realizado ${index} de 32 ejercicios.</h5>
      <p>Ha obtenido una puntuación de ${globalHits}.</p>
      <p>A continuación, realizará el siguiente ejercicio.</p>
    </div>
    <div class="modal-footer text-center bg-blue-blue-100">
      <button type="button" class="btn btn-outline-blue-700" onclick="next()">Continuar</button>
    </div>
  </div>
  `;
  modalContainer.innerHTML = modalHTML;
  $("#nextModal").modal('show');
}

// Variables globales para almacenar hits y misses
let globalHits = 0;
let globalMisses = 0;

function handleButtonClick(selectedLetter, exerciseType) {
  let targetLetter;
  let hits, misses;

  if (exerciseType === 'withTarget') {
    targetLetter = document.getElementById("exercise-data").dataset.target;
    hits = createTableWithTargetLetter.hits;
    misses = createTableWithTargetLetter.misses;
  } else if (exerciseType === 'withoutTarget') {
    targetLetter = selectedLetter.getAttribute('data-different-letter');
    hits = createTableWithoutTargetLetter.hits;
    misses = createTableWithoutTargetLetter.misses;
  } else if (exerciseType === 'missingLetter') {
    targetLetter = selectedLetter.getAttribute('data-missing-letter');
    hits = createMissingLetterExercise.hits;
    misses = createMissingLetterExercise.misses;
  } else if (exerciseType === 'extraLetter') {
    targetLetter = selectedLetter.getAttribute('data-extra-letter');
    hits = createExtraLetterExercise.hits;
    misses = createExtraLetterExercise.misses;
  } else if (exerciseType === 'errorClick') {
    targetLetter = selectedLetter.getAttribute('data-is-incorrect');
    hits = createErrorClickExercise.hits;
    misses = createErrorClickExercise.misses;
  } else if (exerciseType === 'correctClick') {
    targetLetter = selectedLetter.getAttribute('data-is-correct');
    hits = createLetterCorrectionExercise.hits;
    misses = createLetterCorrectionExercise.misses;
  } else if (exerciseType === 'reorderLetters') {
    targetLetter = selectedLetter.getAttribute('data-reordered');
    hits = createReorderLettersExercise.hits;
    misses = createReorderLettersExercise.misses;
  } else if (exerciseType === 'separateWords') {
    targetLetter = selectedLetter.getAttribute('data-reordered');
    hits = createSeparateWordsExercise.hits;
    misses = createSeparateWordsExercise.misses;
  } else if (exerciseType === 'sequence') {
    targetLetter = selectedLetter.getAttribute('data-target-sequence');
    hits = createSequenceExercise.hits;
    misses = createSequenceExercise.misses;
  } else if (exerciseType === "audioWord") {
    targetLetter = selectedLetter.getAttribute("data-target-word");
    hits = createAudioWordExercise.hits;
    misses = createAudioWordExercise.misses;
  }

  if (selectedLetter.innerText === targetLetter) {
    hits++;
    globalHits++; // Actualiza el hit global
  } else {
    misses++;
    globalMisses++; // Actualiza el miss global
  }

  if (exerciseType === 'withTarget') {
    createTableWithTargetLetter.hits = hits;
    createTableWithTargetLetter.misses = misses;
  } else if (exerciseType === 'withoutTarget') {
    createTableWithoutTargetLetter.hits = hits;
    createTableWithoutTargetLetter.misses = misses;
  } else if (exerciseType === 'missingLetter') {
    createMissingLetterExercise.hits = hits;
    createMissingLetterExercise.misses = misses;
  } else if (exerciseType === 'extraLetter'){
    createExtraLetterExercise.hits = hits;
    createExtraLetterExercise.misses = misses;
  } else if (exerciseType === 'errorClick') {
    createErrorClickExercise.hits = hits;
    createErrorClickExercise.misses = misses;
  } else if (exerciseType === 'correctClick') {
    createLetterCorrectionExercise.hits = hits;
    createLetterCorrectionExercise.misses = misses;
  } else if (exerciseType === 'reorderLetters') {
    createReorderLettersExercise.hits = hits;
    createReorderLettersExercise.misses = misses;
  } else if (exerciseType === 'separateWords') {
    createSeparateWordsExercise.hits = hits;
    createSeparateWordsExercise.misses = misses;
  } else if (exerciseType === 'sequence') {
    createSequenceExercise.hits = hits;
    createSequenceExercise.misses = misses;
  } else if (exerciseType === "audioWord") {
    createAudioWordExercise.hits = hits;
    createAudioWordExercise.misses = misses;
  }

  console.log("Letra pulsada: " + selectedLetter.innerText);
  return { hits, misses };
}

function createTableWithTargetLetter(letters, dim, target) {
  const table = document.getElementById("tableQ");
  createTableWithTargetLetter.hits = 0;
  createTableWithTargetLetter.misses = 0;

  for (let i = 0; i < dim; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < dim; j++) {
      let cell = document.createElement("td");

      let button = document.createElement("button");
      button.className = "btn btn-light fs-lg-2 fs-md-4 fs-sm-6 border-0";
      button.style.width = "100%";
      button.style.height = "100%";
      button.style.fontSize = "15px";
      button.addEventListener("click", function () {
        const { hits, misses } = handleButtonClick(this, 'withTarget');
        console.log("Hits: " + hits + ", Misses: " + misses);
        updateTable();
      });

      const index = Math.floor(Math.random() * letters.length);
      const letter = letters[index];
      button.innerText = letter;

      cell.appendChild(button);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  // Función para colocar la letra 'target' en una posición aleatoria
  function placeRandomTarget() {
    const randomRow = Math.floor(Math.random() * dim);
    const randomColumn = Math.floor(Math.random() * dim);
    table.rows[randomRow].cells[randomColumn].firstChild.innerText = target;
  }

  // Llamamos a la función placeRandomTarget() para asegurar que haya al menos una letra 'target' en la tabla
  placeRandomTarget();

  function updateTable() {
    let targetPlaced = false;

    for (let i = 0; i < table.rows.length; i++) {
      for (let j = 0; j < table.rows[i].cells.length; j++) {
        const index = Math.floor(Math.random() * letters.length);
        const letter = letters[index];
        table.rows[i].cells[j].firstChild.innerText = letter;

        // Verifica si la letra 'target' ya ha sido colocada
        if (letter === target) {
          targetPlaced = true;
        }
      }
    }

    // Si la letra 'target' no se ha colocado, colócala en una posición aleatoria
    if (!targetPlaced) {
      placeRandomTarget();
    }
  }
}

function createTableWithoutTargetLetter(letters, dim) {
  const table = document.getElementById("tableQ");
  createTableWithoutTargetLetter.hits = 0;
  createTableWithoutTargetLetter.misses = 0;

  function updateTable() {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetterObj = letters[randomIndex];
    const differentLetter = Object.keys(randomLetterObj)[0];
    const commonLetter = randomLetterObj[differentLetter];
  
    // Rellenar la tabla con la letra común primero
    for (let i = 0; i < table.rows.length; i++) {
      for (let j = 0; j < table.rows[i].cells.length; j++) {
        table.rows[i].cells[j].firstChild.innerText = commonLetter;
      }
    }
  
    // Colocar la letra diferente en una posición aleatoria
    const randomRow = Math.floor(Math.random() * dim);
    const randomColumn = Math.floor(Math.random() * dim);
    table.rows[randomRow].cells[randomColumn].firstChild.innerText = differentLetter;
    table.rows[randomRow].cells[randomColumn].firstChild.setAttribute('data-different-letter', differentLetter);
  }
  

  for (let i = 0; i < dim; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < dim; j++) {
      let cell = document.createElement("td");

      let button = document.createElement("button");
      button.className = "btn btn-light fs-lg-2 fs-md-4 fs-sm-6 border-0";
      button.style.width = "100%";
      button.style.height = "100%";
      button.style.fontSize = "15px";
      button.addEventListener("click", function () {
        const { hits, misses } = handleButtonClick(this, 'withoutTarget');
        console.log("Hits: " + hits + ", Misses: " + misses);
        updateTable(); // Llama a updateTable() cada vez que se hace clic en un botón
      });

      cell.appendChild(button);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  // Llama a updateTable() por primera vez para llenar la tabla con las letras iniciales
  updateTable();
}

function createMissingLetterExercise(letters) {
  // Variables globales para almacenar hits y misses
  createMissingLetterExercise.hits = 0;
  createMissingLetterExercise.misses = 0;

  const table = document.getElementById("tableQ");
  let currentIndex = 0;

  function displayExercise() {
    if (currentIndex < letters.length) {
      const currentExercise = letters[currentIndex];
      const word = Object.keys(currentExercise)[0];
      const missingLetter = currentExercise[word][0]["missing"];
      const choices = currentExercise[word][1]["letters"];
  
      // Imprimir la palabra con el hueco en blanco
      const wordElement = document.getElementById("word");
      wordElement.innerText = word.replace("_", "_");

      // Crear botones de letras
      const lettersContainer = document.getElementById("letters");
      lettersContainer.innerHTML = "";
      choices.forEach((letter) => {
        const button = document.createElement("button");
        button.className = "btn btn-outline-indigo-700 fs-3 mr-1 mb-1";
        button.innerText = letter;
        button.setAttribute("data-missing-letter", missingLetter);
        button.addEventListener("click", function () {
          const { hits, misses } = handleButtonClick(this, 'missingLetter');
          console.log("Hits: " + hits + ", Misses: " + misses);
          currentIndex++;
          displayExercise(); // Llama a displayExercise() cada vez que se hace clic en un botón
        });

        lettersContainer.appendChild(button);
      });
    } else {
      // Mostrar modal aquí cuando se complete el ejercicio
    }
  }

  displayExercise(); // Llama a displayExercise() por primera vez para llenar la tabla con las letras iniciales
}

function createExtraLetterExercise(letters) {
  // Variables globales para almacenar hits y misses
  createExtraLetterExercise.hits = 0;
  createExtraLetterExercise.misses = 0;

  let currentIndex = 0;

  function displayExtraLetterExercise() {
    if (currentIndex < letters.length) {
      const currentExercise = letters[currentIndex];
      const word = Object.keys(currentExercise)[0];
      const extraLetter = currentExercise[word];

      // Imprimir la palabra con la letra extra
      const wordElement = document.getElementById("word");
      wordElement.innerHTML = "";

      for (let i = 0; i < word.length; i++) {
        const letterElement = document.createElement("span");
        letterElement.className = "extra-letter fs-3";
        letterElement.innerText = word[i];
        letterElement.setAttribute("data-extra-letter", extraLetter);
        letterElement.addEventListener("click", function () {
          const { hits, misses } = handleButtonClick(this, 'extraLetter');
          console.log("Hits: " + hits + ", Misses: " + misses);
          currentIndex++;
          displayExtraLetterExercise(); // Llama a displayExtraLetterExercise() cada vez que se hace clic en un elemento de letra
        });

        // Estilos aplicados desde JavaScript
        letterElement.style.cursor = "pointer";
        letterElement.onmouseover = function () {
          this.style.color = "indigo";
        };
        letterElement.onmouseout = function () {
          this.style.color = "";
        };

        wordElement.appendChild(letterElement);
      }
    } else {
      // Mostrar modal aquí cuando se complete el ejercicio
    }
  }

  displayExtraLetterExercise(); // Llama a displayExtraLetterExercise() por primera vez para mostrar la primera palabra
}

function createErrorClickExercise(letters) {
  createErrorClickExercise.hits = 0;
  createErrorClickExercise.misses = 0;

  const exerciseContainer = document.getElementById("exercise-container");

  function displayErrorClickExercise() {
    if (letters.length > 0) {
      const letterObj = letters.shift();
      const sentence = Object.keys(letterObj)[0];
      const incorrectWord = letterObj[sentence];
      const words = sentence.split(' ');

      const wordSpans = words.map(word => {
        const span = document.createElement('span');
        span.textContent = word;
        //span.classList.add("fs-2");
        span.classList.add('clickable-word', 'fs-2');
        span.tabIndex = 0;

        if (word === incorrectWord) {
          span.setAttribute('data-is-incorrect', word);
        }

        // Eventos y estilos
        span.style.cursor = "pointer";
        span.addEventListener('mouseenter', () => {
          span.style.color = 'indigo';
        });
        span.addEventListener('mouseleave', () => {
          span.style.color = '';
        });
        span.addEventListener('blur', () => {
          span.style.backgroundColor = '';
        });

        return span;
      });

      exerciseContainer.innerHTML = '';
      wordSpans.forEach(span => {
        exerciseContainer.appendChild(span);
        exerciseContainer.appendChild(document.createTextNode(' '));
      });

      exerciseContainer.onclick = function (event) {
        if (event.target.classList.contains('clickable-word')) {
          const { hits, misses } = handleButtonClick(event.target, 'errorClick');
          console.log('Hits:', hits, 'Misses:', misses);

          if (letters.length > 0) {
            displayErrorClickExercise();
          } else {
            console.log('Ejercicio completado');
          }
        }
      };
    }
  }

  displayErrorClickExercise();
}

function createLetterCorrectionExercise(letters) {
  createLetterCorrectionExercise.hits = 0;
  createLetterCorrectionExercise.misses = 0;

  let currentIndex = 0;

  const wordContainer = document.getElementById("word-container");
  const choicesContainer = document.getElementById("choices-container");

  function displayCurrentWord() {
    const currentExercise = letters[currentIndex];
    const word = Object.keys(currentExercise)[0];
    const extraLetterInfo = currentExercise[word];
    const wrong = Object.values(extraLetterInfo[0])[0];
    const right = Object.values(extraLetterInfo[1])[0];
    const choices = Object.values(extraLetterInfo[2])[0];

    wordContainer.innerHTML = '';

    for (let i = 0; i < word.length; i++) {
      const letterElement = document.createElement("span");
      letterElement.textContent = word[i];
      letterElement.classList.add("letter", "fs-3");

      letterElement.style.cursor = "pointer";
      letterElement.addEventListener('mouseenter', () => {
        letterElement.style.color = 'indigo';
      });
      letterElement.addEventListener('mouseleave', () => {
        letterElement.style.color = '';
      });
      letterElement.addEventListener('blur', () => {
        letterElement.style.backgroundColor = '';
      });
      
      letterElement.addEventListener("click", () => {
        if (letterElement.textContent === wrong) {
          const buttonsContainer = document.createElement("div");
          buttonsContainer.classList.add("choice-buttons");

          choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.classList.add("btn", "btn-outline-indigo-700", "fs-3","mb-1","mr-1","choice-button");

            // Agregamos el atributo data-is-incorrect a cada botón
            button.setAttribute('data-is-correct', right);

            button.addEventListener("click", () => {
              const { hits, misses } = handleButtonClick(button, 'correctClick');
              console.log('Hits:', hits, 'Misses:', misses);

              currentIndex++;
              buttonsContainer.remove();
              if (currentIndex < letters.length) {
                displayCurrentWord();
              }
            });

            buttonsContainer.appendChild(button);
          });

          choicesContainer.innerHTML = '';
          choicesContainer.appendChild(buttonsContainer);
        } else {
          console.log("Sigue intentándolo");
        }
      });

      wordContainer.appendChild(letterElement);
    }
  }

  displayCurrentWord();
}

function createReorderLettersExercise(letters) {
  createReorderLettersExercise.hits = 0;
  createReorderLettersExercise.misses = 0;

  let currentIndex = 0;

  const wordContainer = document.getElementById("word-container");
  const choicesContainer = document.getElementById("choices-container");

  function displayCurrentWord() {
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
          const result = handleButtonClick({innerText: userAnswerString, getAttribute: () => word}, 'reorderLetters');
          console.log('Hits:', result.hits, 'Misses:', result.misses);
        
          currentIndex++;
          if (currentIndex < letters.length) {
            displayCurrentWord();
          }
        }
      });

      choicesContainer.appendChild(button);
    });
  }

  displayCurrentWord();
}

function createSeparateWordsExercise(letters) {
  createSeparateWordsExercise.hits = 0;
  createSeparateWordsExercise.misses = 0;

  let currentIndex = 0;

  const wordContainer = document.getElementById("word-container");
  const choicesContainer = document.getElementById("choices-container");

  function displayCurrentSentence() {
    const currentExercise = letters[currentIndex];
    const sentence = Object.keys(currentExercise)[0];
    const correctWords = currentExercise[sentence];

    wordContainer.innerHTML = sentence;
    wordContainer.classList.add("fs-2","mb-4");
    choicesContainer.innerHTML = '';

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.classList.add("form-control","fs-4");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Fin";
    submitButton.classList.add("btn", "btn-outline-indigo-700", "mt-3","fs-4","col-4");
    submitButton.addEventListener("click", () => {
      const userInput = inputField.value.trim().split(/\s+/);

      for (let i = 0; i < correctWords.length; i++) {
        const result = handleButtonClick({innerText: userInput[i], getAttribute: () => correctWords[i]}, 'separateWords');
        console.log('Hits:', result.hits, 'Misses:', result.misses);
      }

      currentIndex++;
      if (currentIndex < letters.length) {
        displayCurrentSentence();
      }
    });

    choicesContainer.appendChild(inputField);
    choicesContainer.appendChild(submitButton);
  }

  displayCurrentSentence();
}

function createSequenceExercise(letters) {

  const timer = document.getElementById("header");
  timer.style.display = 'none';

  createSequenceExercise.hits = 0;
  createSequenceExercise.misses = 0;

  let currentIndex = 0;

  const wordContainer = document.getElementById("word-container");
  const choicesContainer = document.getElementById("choices-container");
  

  function displayCurrentSequence() {
    const countDown = document.getElementById("timer");

    const currentSequence = letters[currentIndex];
    wordContainer.textContent = currentSequence;
    wordContainer.classList.add("fs-1","mb-4");

    countDown.textContent = 3 + " segundos"; // Inicializa el contador con el valor 3
    const countdown = setInterval(() => {
      const currentTime = parseInt(countDown.textContent, 10);
      if (currentTime > 0) {
        countDown.textContent = currentTime - 1 + " segundos";
      } else {
        clearInterval(countdown);
        countDown.textContent = 'Introduce la serie'; // Muestra "Introduce la serie" cuando el tiempo se agote
      }
    }, 1000);
    
    setTimeout(() => {
      wordContainer.textContent = "";
      choicesContainer.innerHTML = '';
      countDown.textContent = "Introduce la serie";
      const inputField = document.createElement("input");
      inputField.setAttribute("type", "text");
      inputField.classList.add("form-control","fs-4");

      const submitButton = document.createElement("button");
      submitButton.textContent = "Fin";
      submitButton.classList.add("btn", "btn-outline-indigo-700", "mt-3","fs-4","col-4");
      submitButton.addEventListener("click", () => {
        const userAnswer = inputField.value;

        const selectedLetter = {
          innerText: userAnswer,
          getAttribute: (attr) => {
            if (attr === 'data-target-sequence') {
              return currentSequence;
            }
          }
        };

        const result = handleButtonClick(selectedLetter, 'sequence');
        console.log('Hits:', result.hits, 'Misses:', result.misses);

        currentIndex++;
        if (currentIndex < letters.length) {
          displayCurrentSequence();
        } else {
          showModal(30,globalHits);
        }

        choicesContainer.innerHTML = '';
      });

      choicesContainer.appendChild(inputField);
      choicesContainer.appendChild(submitButton);
    }, 3000);
  }

  displayCurrentSequence();
}

function createAudioWordExercise(letters, index) {
  createAudioWordExercise.hits = 0;
  createAudioWordExercise.misses = 0;

  let currentIndex = 0;

  const wordContainer = document.getElementById("word-container");
  const choicesContainer = document.getElementById("choices-container");
  const header = document.getElementById("header");

  function displayCurrentAudioWord() {
    if (currentIndex >= letters.length) {
      showModal(index, globalHits);
      return;
    }

    const currentWord = Object.keys(letters[currentIndex])[0];
    const audioSrc = Object.values(letters[currentIndex])[0];

    const audioButton = document.createElement("button");
    audioButton.textContent = "Escuchar audio";
    audioButton.classList.add("btn", "bg-blue-blue-700", "text-light", "m-3", "fs-4");
    audioButton.addEventListener("click", () => {
      const audio = new Audio(audioSrc);
      audio.play();
      audioButton.disabled = true; // Deshabilitar el botón después de presionarlo
    });

    header.innerHTML = ''; // Limpiar el wordContainer antes de mostrar el siguiente botón de audio
    header.appendChild(audioButton);

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.classList.add("form-control");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Fin";
    submitButton.classList.add("btn", "btn-outline-indigo-600", "m-2", "fs-4", "col-4");
    submitButton.addEventListener("click", () => {
      const userAnswer = inputField.value;

      // Crear un objeto que contenga las propiedades necesarias para handleButtonClick
      const selectedLetter = {
        innerText: userAnswer.toLowerCase(),
        getAttribute: (attr) => {
          if (attr === 'data-target-word') {
            return currentWord;
          }
        }
      };

      const result = handleButtonClick(selectedLetter, 'audioWord');
      console.log('Hits:', result.hits, 'Misses:', result.misses);

      currentIndex++;
      choicesContainer.innerHTML = ''; // Limpiar choicesContainer antes de mostrar el siguiente input
      displayCurrentAudioWord(); // Llamar a displayCurrentAudioWord() para mostrar el siguiente input
    });

    choicesContainer.appendChild(inputField);
    choicesContainer.appendChild(submitButton);
  }

  displayCurrentAudioWord();
}

