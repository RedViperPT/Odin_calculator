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
		alert('Nice try, the universe remains intact!');
		return NaN;
	}
	return a / b;
}

function operate(a, b, operator) {
	a = number(a);
	b = number(b);
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

function inputNumber(number) {
	if (waitingForSecondNumber) {
		displayValue = number;
		waitingForSecondNumber = false;
	} else {
		displayValue = displayValue + number;
	}
	updateDisplay();
}

function inputOperator(operator) {
	//need to write
	let firstNumber = parseFloat(displayValue);

	displayValue = displayValue + operator;
}

function updateDisplay() {
	display.textContent = displayValue;
}

function clear() {
	displayValue = '0';
	operator = null;
	firstNumber = null;
	waitingForSecondNumber = true;
}
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('.clear');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const decimalButton = document.querySelector('.decimal');

let displayValue = '0';
let operator = null;
let firstNumber = null;
let waitingForSecondNumber = true;

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		inputNumber(button.textContent);
	});
});

operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		inputOperator(button.textContent);
		updateDisplay();
	});
});
