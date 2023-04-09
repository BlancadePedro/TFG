// Aumentar o disminuir el tamaño de la fuente
console.log(1111)

function saveSettings() {
    localStorage.setItem('fontSize', $('#font-size').val());
    localStorage.setItem('fontFamily', $('#font-family').val());
    localStorage.setItem('lineHeight', $('#line-height').val());
    localStorage.setItem('cursorSize', cursorSizeState);
}


function changeFontSize(size) {
    $('html').removeClass('font-size-1 font-size-2 font-size-3 font-size-4 font-size-5')
        .addClass('font-size-' + size);
        console.log('font-size-' + size)
}

function changeFontFamily(font) {
    $('body, html').removeClass('text-font-opendyslexic text-font-monserrat text-font-open-sans text-font-roboto text-font-lato');

    switch (font) {
        case "1":
            $('body, html').addClass('text-font-opendyslexic');
            break;
        case "2":
            $('body, html').addClass('text-font-monserrat');
            break;
        case "3":
            $('body, html').addClass('text-font-open-sans');
            break;
        case "4":
            $('body, html').addClass('text-font-roboto');
            break;
        case "5":
            $('body, html').addClass('text-font-lato');
            break;
    }
}

function changeLineHeight(lineHeight) {
    $('body, html').removeClass('line-height-1 line-height-2 line-height-3')
        .addClass('line-height-' + lineHeight);
        console.log('line-height-' + lineHeight)
}

function changeCursorSize(cursor) {
    $('html').removeClass('cursor-1 cursor-2')
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
        $('#line-height').val(savedLineHeight);
        changeLineHeight(savedLineHeight);
    }

    if (savedCursorSize) {
        cursorSizeState = parseInt(savedCursorSize, 10);
        changeCursorSize(cursorSizeState);
    }
}



$(document).ready(function () {
let cursorSizeState = 1;

function saveSettings() {
    localStorage.setItem('fontSize', $('#font-size').val());
    localStorage.setItem('fontFamily', $('#font-family').val());
    localStorage.setItem('lineHeight', $('#line-height').val());
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
        $('#font-family').val(savedLineHeight);
        changeLineHeight(savedLineHeight);
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
    $('#line-height').on('change', function () {
        changeLineHeight(this.value);
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

