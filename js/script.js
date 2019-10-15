var calcEval, keyText, keyType;

var addedOn = false;

var DOM = {
    headerContainer: document.querySelector('header'),
    displayValue: document.querySelector('#displayValue'),
    displayCalc: document.querySelector('#displayCalc')
};

var eventListeners = function () {
    document.addEventListener('click', clickEvent);
};

var clickEvent = function (event) {
    var clickedOn = event.target.innerText;

    checkNumbersWidth();

    if (event.target.className === 'num' || event.target.className === 'width-half num') {
        disVal(clickedOn);
    } else if (event.target.className === 'sign') {
        DOM.displayCalc.innerText = DOM.displayCalc.innerText + DOM.displayValue.innerText + clickedOn;
        addedOn = true;
    }

    if (clickedOn === 'AC') {
        cleanAC();
    }

    if (event.target.id === 'calcEqual') {
        displayResult();
    }

    if (event.target.id === 'backSpace') {
        deleteLastNum();

        if (DOM.displayValue.innerText === '') {
            DOM.displayValue.innerText = '0';
        }
    }
};

var displayResult = function () {
    DOM.displayCalc.innerText = DOM.displayCalc.innerText + DOM.displayValue.innerText;

    DOM.displayCalc.innerText = DOM.displayCalc.innerText.replace(/x/g, "*");
    DOM.displayCalc.innerText = DOM.displayCalc.innerText.replace(/÷/g, "/");

    calcEval = eval(DOM.displayCalc.innerText);
    DOM.displayValue.innerText = calcEval;


    DOM.displayCalc.innerText = '';
    DOM.displayValue.classList.remove('overflow');
    checkNumbersWidth();

    addedOn = true;
};

var cleanAC = function () {
    DOM.displayValue.innerText = '0';
    DOM.displayCalc.innerText = '';
    addedOn = false;
    DOM.displayValue.classList.remove('overflow');
};

var deleteLastNum = function () {
    DOM.displayValue.innerText = DOM.displayValue.innerText.substring(0, DOM.displayValue.innerText.length - 1);
};


var disVal = function (txt) {
    if (DOM.displayValue.innerText === '0' || addedOn == true) {
        DOM.displayValue.innerText = '';
        checkNumbersWidth(addedOn);
        addedOn = false;
    }

    DOM.displayValue.innerText += txt;
};

var checkNumbersWidth = function (addedOn) {
    if (DOM.displayValue.clientWidth > DOM.headerContainer.clientWidth - 50) {
        DOM.displayValue.classList.add('overflow');
    }
};

eventListeners();














/*document.addEventListener("keydown", keypressEvent);*/

/* have too much bugs with shift + 8 = *
var keypressEvent = function (event) {
    var pressedOn = event.keyCode;
    console.log(event);
    switch (pressedOn) {
        case 8:
            deleteLastNum();
            break;
        case 13:
            displayResult();
            break;
        case 27:
            cleanAC();
            break;
        case 88:
            keyText = 'x';
            keyType = 'sign';
            break;
        case 187:
            keyText = '+';
            keyType = 'sign';
            break;
        case 189:
            keyText = '-';
            keyType = 'sign';
            break;
        case 190:
            keyText = '.';
            keyType = 'num';
            break;
        case 191:
            keyText = '÷';
            keyType = 'sign';
            break;
        case 48:
            keyText = '0';
            keyType = 'num';
            break;
        case 49:
            keyText = '1';
            keyType = 'num';
            break;
        case 50:
            keyText = '2';
            keyType = 'num';
            break;
        case 51:
            keyText = '3';
            keyType = 'num';
            break;
        case 52:
            keyText = '4';
            keyType = 'num';
            break;
        case 53:
            keyText = '5';
            keyType = 'num';
            break;
        case 54:
            keyText = '6';
            keyType = 'num';
            break;
        case 55:
            keyText = '7';
            keyType = 'num';
            break;
        case 56:
            keyText = '8';
            keyType = 'num';
            break;
        case 57:
            keyText = '9';
            keyType = 'num';
            break;
        case 61:
            displayResult();
            break;
    }

    if (event.shiftKey == true && pressedOn == 56) {
        keyText = 'x';
        keyType = 'sign';
    }

    console.log(keyText);

    if (typeof keyText == 'string') {
        if (keyType === 'num') {
            disVal(keyText);
        } else if (keyType === 'sign') {
            DOM.displayCalc.innerText = DOM.displayCalc.innerText + DOM.displayValue.innerText + keyText;
            addedOn = true;
        }
    }
}; */