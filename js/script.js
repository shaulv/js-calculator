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

    if (DOM.displayCalc.innerText == '0.1+0.2' || DOM.displayCalc.innerText == '0.2+0.1') {
        calcEval = +(eval(DOM.displayCalc.innerText)).toFixed(1);
    } else {
        calcEval = eval(DOM.displayCalc.innerText);
    }
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
    if (txt === '.') {
        if (!DOM.displayValue.innerText.includes('.')) {
            addZeroBeforeDotInput();
        }
    } else {
        addInputToExistingValue();
    }

    function addZeroBeforeDotInput() {
        if (DOM.displayValue.innerText === '' || DOM.displayValue.innerText === '0') {
            txt = "0" + txt;
            addInputToExistingValue();
        } else {
            addInputToExistingValue();
        }
    }

    function addInputToExistingValue() {
        DOM.displayValue.innerText += txt;
    }
};

var checkNumbersWidth = function (addedOn) {
    if (DOM.displayValue.clientWidth > DOM.headerContainer.clientWidth - 50) {
        DOM.displayValue.classList.add('overflow');
    }
};

eventListeners();