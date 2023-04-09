// Aumentar o disminuir el tamaño de la fuente
console.log(1111)

function saveSettings() {
    localStorage.setItem('fontSize', $('#font-size').val());
    localStorage.setItem('fontFamily', $('#font-family').val());
    localStorage.setItem('lineHeight', lineHeightState);
    localStorage.setItem('cursorSize', cursorSizeState);
}


function changeFontSize(size) {
    $('body, h4, h5, h6, list-group, list-group-item, accordion-header, accordion-button, li, button, input, a, label').removeClass('font-size-1 font-size-2 font-size-3 font-size-4 font-size-5')
        .addClass('font-size-' + size);
        console.log('font-size-' + size)
    }

    // Cambiar el tipo de fuente
function changeFontFamily(font) {
    $('body, h1, h2, h3, h4, h5, h6, list-group, list-group-item, accordion-header, accordion-button, li, button, input, a, label').removeClass('font-family-1 font-family-2 font-family-3 font-family-4')
        .addClass('font-family-' + font);
        console.log('font-family-' + font)
    }

    // Aumentar o disminuir el interlineado
function changeLineHeight(lineHeight) {
    $('body, h1, h2, h3, h4, h5, h6, list-group, list-group-item, accordion-header, accordion-button, li, button, input, a, label').removeClass('line-height-1 line-height-2')
        .addClass('line-height-' + lineHeight);
        console.log('line-height-' + lineHeight)
    }

    // Aumentar o disminuir el tamaño del cursor
function changeCursorSize(cursor) {
    $('body, h1, h2, h3, h4, h5, h6, list-group, list-group-item, accordion-header, accordion-button, li, button, input, a, label').removeClass('cursor-1 cursor-2')
        .addClass('cursor-' + cursor);
        console.log('cursor-' + cursor)
}

function loadSettings() {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedLineHeight = localStorage.getItem('lineHeight');
    const savedCursorSize = localStorage.getItem('cursorSize');

    if (savedFontSize) {
        $('#font-size').val(savedFontSize);
        changeFontSize(savedFontSize);
    }

    if (savedFontFamily) {
        $('#font-family').val(savedFontFamily);
        changeFontFamily(savedFontFamily);
    }

    if (savedLineHeight) {
        lineHeightState = parseInt(savedLineHeight, 10);
        changeLineHeight(lineHeightState);
    }

    if (savedCursorSize) {
        cursorSizeState = parseInt(savedCursorSize, 10);
        changeCursorSize(cursorSizeState);
    }
}


$(document).ready(function () {
    // Variables para controlar el interlineado y el tamaño del cursor
let lineHeightState = 1;
let cursorSizeState = 1;

function saveSettings() {
    localStorage.setItem('fontSize', $('#font-size').val());
    localStorage.setItem('fontFamily', $('#font-family').val());
    localStorage.setItem('lineHeight', lineHeightState);
    localStorage.setItem('cursorSize', cursorSizeState);
}

function loadSettings() {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedLineHeight = localStorage.getItem('lineHeight');
    const savedCursorSize = localStorage.getItem('cursorSize');

    if (savedFontSize) {
        $('#font-size').val(savedFontSize);
        changeFontSize(savedFontSize);
    }

    if (savedFontFamily) {
        $('#font-family').val(savedFontFamily);
        changeFontFamily(savedFontFamily);
    }

    if (savedLineHeight) {
        lineHeightState = parseInt(savedLineHeight, 10);
        changeLineHeight(lineHeightState);
    }

    if (savedCursorSize) {
        cursorSizeState = parseInt(savedCursorSize, 10);
        changeCursorSize(cursorSizeState);
    }
}

$(document).ready(function () {
    loadSettings();

    // Cambiar el tamaño de fuente
    $('#font-size').on('change', function () {
        changeFontSize(this.value);
        saveSettings();
    });

    // Cambiar el tipo de fuente
    $('#font-family').on('change', function () {
        changeFontFamily(this.value);
        saveSettings();
    });

    // Cambiar el interlineado
    $('#toggle-line-height').on('click', function () {
        lineHeightState = 3 - lineHeightState; // Cambia entre 1 y 2
        changeLineHeight(lineHeightState);
        saveSettings();
    });

    // Cambiar el tamaño del cursor
    $('#toggle-cursor-size').on('click', function () {
        cursorSizeState = 3 - cursorSizeState; // Cambia entre 1 y 2
        changeCursorSize(cursorSizeState);
        saveSettings();
    });
});

});

