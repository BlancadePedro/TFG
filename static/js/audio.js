const nextExercise = document.getElementById('nextExercise');
const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
    audioElement.play();
    playButton.disabled = true;
});

// Ir a la siguiente vista al hacer clic en el botón "Siguiente"
nextExercise.addEventListener('click', () => {
    const exerciseIndex = parseInt(nextExercise.getAttribute("data-index"), 10);
    window.location.href = '/prueba/question/'+exerciseIndex;
});