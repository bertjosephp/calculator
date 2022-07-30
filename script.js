let currentInputString = '';
let previousInputString = '';
let firstNumber;
let secondNumber;
let currentOperator;

const buttons = document.querySelectorAll('button');
const previousDisplay = document.querySelector('.previous-display');
const currentDisplay = document.querySelector('.current-display');

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '−', '×', '÷'];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '−':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            if (b === 0) {
                return 'Undefined';
            } else {
                return divide(a, b);
            }
    }
}

function setFirstNumber(string) {
    firstNumber = Number(string);
}

function setSecondNumber(string) {
    secondNumber = Number(string);
}

function setOperator(string) {
    switch(string) {
        case '+':
            currentOperator = '+';
            break;
        case '−':
            currentOperator = '−';
            break;
        case '×':
            currentOperator = '×';
            break;
        case '÷':
            currentOperator = '÷';
            break;
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        // number buttons
        if (numbers.includes(e.target.textContent)) {
            if (previousInputString.slice(-1) === '=') {
                previousInputString = '';
                currentInputString = '';
                firstNumber = undefined;
            }
            currentInputString += e.target.textContent;
        } 

        // operator buttons
        else if (operators.includes(e.target.textContent)) {
            if (!firstNumber && currentInputString === '') {
                //do nothing
            } else if (!firstNumber) {
                setFirstNumber(currentInputString);
                setOperator(e.target.textContent);
                previousInputString = currentInputString + ' ' + e.target.textContent;
                currentInputString = '';
            } else if (currentInputString !== '') {
                if (currentOperator) {
                    setSecondNumber(currentInputString);
                    previousInputString = operate(currentOperator, firstNumber, secondNumber);
                    currentInputString = '';
                    setFirstNumber(previousInputString);
                    secondNumber = undefined;
                    setOperator(e.target.textContent);
                    previousInputString += ' ' + e.target.textContent;
                } else {
                    setOperator(e.target.textContent);
                    previousInputString = firstNumber + ' ' + e.target.textContent;
                    currentInputString = '';
                }
            } else if (operators.includes(previousInputString.slice(-1))) {
                setOperator(e.target.textContent);
                previousInputString = previousInputString.slice(0, -1) + e.target.textContent;
            }
        }

        // equals button
        else if (e.target.textContent === '=') {
            if (previousInputString.slice(-1) === '=') {
                setFirstNumber(currentInputString);
                previousInputString = firstNumber + ' ' + e.target.textContent;
            } else if (firstNumber === undefined && secondNumber === undefined && currentInputString !== '') {
                setFirstNumber(currentInputString);
                previousInputString = firstNumber + ' ' + e.target.textContent;
            } else if (!secondNumber && currentInputString) {
                setSecondNumber(currentInputString);
                previousInputString += ' ' + secondNumber + ' ' + e.target.textContent;
                currentInputString = operate(currentOperator, firstNumber, secondNumber);
                setFirstNumber(currentInputString);
                secondNumber = undefined;
                currentOperator = undefined;
            }
        }

        // decimal button
        else if (e.target.textContent === '.') {
            if (!currentInputString.includes('.')) {
                currentInputString += e.target.textContent;
            }
        }

        // clear button
        else if (e.target.textContent === 'C') {
            previousInputString = '';
            currentInputString = '';
            firstNumber = undefined;
            secondNumber = undefined;
            currentOperator = undefined;
        }

        // delete button
        else if (e.target.textContent === 'DEL') {
            if (currentInputString !== '') {
                currentInputString = currentInputString.slice(0, -1);
            }
        }

        // display
        currentDisplay.textContent = currentInputString;
        previousDisplay.textContent = previousInputString;
    });
});