function exit() {
    console.log('Funciona');
    window.location.href = "/home";
}

document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.getElementById("progress-bar");
    const exerciseIndex = parseInt(progressBar.getAttribute("data-index"), 10);
    const progressPercentage = (exerciseIndex / 32) * 100;

    progressBar.style.width = progressPercentage + "%";
    progressBar.setAttribute("aria-valuenow", exerciseIndex);
});