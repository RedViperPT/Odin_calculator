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
	if (b === 0) {
		return 'Nice try, the universe remains intact!';
		// return NaN;
	}
	return a / b;
}

function operate(a, b, operator) {
	a = Number(a);
	b = Number(b);
	switch (operator) {
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '*':
			return multiply(a, b);
		case '/':
			return divide(a, b);
		default:
			return NaN;
	}
}

function updateDisplay() {
	display.textContent = displayValue;
}

function inputNumber(number) {
	if (waitingForSecondNumber) {
		displayValue = number;
		waitingForSecondNumber = false;
	} else {
		displayValue = displayValue === '0' ? number : displayValue + number;
	}
	updateDisplay();
}

function inputOperator(newOperator) {
	const currentValue = parseFloat(displayValue);

	if (operator !== null && !waitingForSecondNumber) {
		const result = operate(firstNumber, currentValue, operator);
		displayValue = String(result);
		firstNumber = result;
	} else {
		firstNumber = currentValue;
	}

	operator = newOperator;
	waitingForSecondNumber = true;
	updateDisplay();
}

function inputDecimal() {
	if (waitingForSecondNumber) {
		displayValue = '0.';
		waitingForSecondNumber = false;
	} else if (!displayValue.includes('.')) {
		displayValue += '.';
	}
	updateDisplay();
}

function equals() {
	if (operator === null || waitingForSecondNumber) return;

	const secondNumber = parseFloat(displayValue);
	const result = operate(firstNumber, secondNumber, operator);

	displayValue = String(result);
	firstNumber = result;
	operator = null;
	waitingForSecondNumber = true;
	updateDisplay();
}

function clear() {
	displayValue = '0';
	firstNumber = null;
	operator = null;
	waitingForSecondNumber = true;
	updateDisplay();
}

function backspace() {
	if (displayValue.length > 1) {
		displayValue = displayValue.slice(0, -1);
	} else {
		displayValue = '0';
	}
	updateDisplay();
}

const display = document.querySelector('[data-display]');
const numberButtons = document.querySelectorAll('[data-number]');
const clearButton = document.querySelector('[data-clear]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const decimalButton = document.querySelector('[data-decimal]');
const backspaceButton = document.querySelector('[data-backspace]');

let displayValue = '0';
let operator = null;
let firstNumber = null;
let waitingForSecondNumber = true;

numberButtons.forEach((button) => {
	button.addEventListener('click', () => inputNumber(button.textContent));
});

operatorButtons.forEach((button) => {
	button.addEventListener('click', () => inputOperator(button.textContent));
});

decimalButton.addEventListener('click', inputDecimal);
equalsButton.addEventListener('click', equals);
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);

document.addEventListener('keydown', (e) => {
	if (e.key >= '0' && e.key <= '9') {
		inputNumber(e.key);
		e.preventDefault();
	} else if (['+', '-', '*', '/'].includes(e.key)) {
		inputOperator(e.key);
		e.preventDefault();
	} else if (e.key === '.' || e.key === ',') {
		inputDecimal();
		e.preventDefault();
	} else if (e.key === 'Enter') {
		equals();
		e.preventDefault();
	} else if (e.key === 'Backspace') {
		backspace();
		e.preventDefault();
	} else if (e.key === 'Escape') {
		clear();
		e.preventDefault();
	}
});
