// Aumentar o disminuir el tamaño de la fuente
console.log(1111)

let cursorSizeState = 1;

function saveSettings() {
    localStorage.setItem('fontSize', $('#font-size').val());
    localStorage.setItem('fontFamily', $('#font-family').val());
    localStorage.setItem('lineHeight', $('#line-height').val());
    localStorage.setItem('letterSpacing', $('#letter-spacing').val());
    localStorage.setItem('cursorSize', cursorSizeState);
}


function changeFontSize(size) {
    $('html').removeClass('font-size-1 font-size-2 font-size-3 font-size-4 font-size-5')
        .addClass('font-size-' + size);
        console.log('font-size-' + size)
}

function changeFontFamily(font) {
    $('body, html').removeClass('font-family-1 font-family-2 font-family-3 font-family-4 font-family-5');

    switch (font) {
        case "1":
            $('body, html').addClass('font-family-1');
            break;
        case "2":
            $('body, html').addClass('font-family-2');
            break;
        case "3":
            $('body, html').addClass('font-family-3');
            break;
        case "4":
            $('body, html').addClass('font-family-4');
            break;
        case "5":
            $('body, html').addClass('font-family-5');
            break;
    }
    console.log('font-font-' + font)
}

function changeLineHeight(lineHeight) {
    $('html, body').removeClass('line-height-1 line-height-2 line-height-3')
        .addClass('line-height-' + lineHeight);
        console.log('line-height-' + lineHeight)
}

function changeCursorSize(cursor) {
    $('body, html').removeClass('cursor-1 cursor-2 cursor-3 cursor-4')
      .addClass('cursor-' + cursor);
        console.log('cursor-' + cursor);
}
  
function changeLetterSpacing(letterSpacing) {
    $('html,body').removeClass('letter-spacing-1 letter-spacing-2 letter-spacing-3')
        .addClass('letter-spacing-' + letterSpacing);
        console.log('letter-spacing-' + letterSpacing);
}

function loadSettings() {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedLineHeight = localStorage.getItem('lineHeight');
    const savedLetterSpacing = localStorage.getItem('letterSpacing');
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

    if (savedLetterSpace){
        $('#letter-spacing').val(savedLetterSpacing);
        changeLetterSpacing(savedLetterSpacing);
    }

    if (savedCursorSize) {
        cursorSizeState = parseInt(savedCursorSize, 10);
        changeCursorSize(cursorSizeState);
    }
}

function nextCursor() {
    cursorSizeState = (cursorSizeState % 4) + 1;
    changeCursorSize(cursorSizeState);
}


$(document).ready(function () {

function saveSettings() {
    localStorage.setItem('fontSize', $('#font-size').val());
    localStorage.setItem('fontFamily', $('#font-family').val());
    localStorage.setItem('lineHeight', $('#line-height').val());
    localStorage.setItem('letterSpacing', $('#letter-spacing').val());
    localStorage.setItem('cursorSize', cursorSizeState);
}

function loadSettings() {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedLineHeight = localStorage.getItem('lineHeight');
    const savedLetterSpacing = localStorage.getItem('letterSpacing');
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

    if (savedLetterSpacing) {
        $('#letter-spacing').val(savedLetterSpacing);
        changeLetterSpacing(savedLetterSpacing);
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

    // Cambiar el espacio entre letras
    $('#letter-spacing').on('change', function () {
        changeLetterSpacing(this.value);
        saveSettings();
    });

    // Cambiar el tamaño del cursor
    $('#change-cursor').on('click', function () {
        nextCursor();
        saveSettings();
    });
});

});