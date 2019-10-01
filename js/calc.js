const MAX_NUMBER_LENGTH = 10;

// vars for storing operands (number inputs)
let input1 = 0;
let input2 = 0;
// flag whether theres a operation to perform
let op_flag = false;
// operator
let operator = "";
// If set to true the input is set to the pressed number instead of appended.
// This takes affect after a binary operator button was pressed.
let clearDisplay = false;

// Assure that too large numbers are cropped to fit the calcualtor display
const cropDisplay = () => {
	let display = document.getElementById("calcDisplay");
	if (display.innerHTML.length > MAX_NUMBER_LENGTH) {
		display.innerHTML = display.innerHTML.substr(0, MAX_NUMBER_LENGTH);
	}
}

const resetDisplay = () => {
	document.getElementById("calcDisplay").innerHTML = "0";
	input1 = 0;
	input2 = 0;
}

const deleteLastChar = () => {
	let display = document.getElementById("calcDisplay");

	// If the number longer than 2 character, delete the last one.
	// Otherwise set it to 0.
	if (display.innerHTML.length > 1) {
		display.innerHTML = display.innerHTML.substr(0, display.innerHTML.length - 1);
	}
	else {
		resetDisplay();
	}
}

// Function called by number buttons and decimal point only
const getNumber = (element) => {
	let display = document.getElementById("calcDisplay");
	let displayedValue = display.innerHTML;
	let input = element.target.innerHTML;

	// If no number has been pressed, displayed the pressed number
	if (clearDisplay || (displayedValue === "0" && input != "0")) {
		// If the decimal point has been pressed, show a leading 0
		if (input === ".") {
			displayedValue = "0" + input;
		}
		else {
			displayedValue = input;
		}
	}
	// If the display shows anything, just append it
	else if (displayedValue !== "0") {
		// If the number already shows a decimal point, do not add another one
		if (!(displayedValue.includes(".") && input === ".")) {
			displayedValue += input;
		}
	}

	// Write new number to the display
	display.innerHTML = displayedValue;

	// Reset flag
	clearDisplay = false;
}

const setAction = (element) => {
	// Save pressed operator
	operator = element.target.dataset.action;

	// Set flag in order to clear the display on the next number button press
	clearDisplay = true;

	// Save number displayed on the calculator.
	// Assume it is the first number when an action is pressed.
	let display = document.getElementById("calcDisplay");
	input1 = Number(display.innerHTML);
}

const calculateUnaryAction = (element) => {
	// Get unary operator
	let unaryOperator = element.target.dataset.action;

	// Get displayed number
	let display = document.getElementById("calcDisplay");
	let number = Number(display.innerHTML);

	// Display result on display direclty instead of saving it to input1 first
	switch (unaryOperator) {
		case "sqrt":
			display.innerHTML = Math.sqrt(number);
			break;
	
		// Calculation done in RAD
		case "sin":
			display.innerHTML = Math.sin(number);
			break;
	}
}

const calculate = () => {
	// Save number displayed on the calculator
	let display = document.getElementById("calcDisplay");
	input2 = Number(display.innerHTML);

	// Save resutl into input1 so another press on the "=" button repeats the action
	switch (operator) {
		case "add":
			input1 += input2;
			break;
	
		case "subtact":
			input1 -= input2;
			break;

		case "multiply":
			input1 *= input2;
			break;

		case "divide":
			input1 /= input2;
			break;
	}

	display.innerHTML = input1;
}

// Add event listeners when the whole page has been loaded
window.onload = () => {
	// See https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver for more information
	observer = new MutationObserver(cropDisplay);
	observer.observe(document.getElementById("calcDisplay"), { childList: true, subtree: true });

	document.getElementById("btnClear").addEventListener("click", resetDisplay, false);

	document.getElementById("btnDelete").addEventListener("click", deleteLastChar, false);

	document.getElementById("btnEquals").addEventListener("click", calculate, false);

	let numberButtons = document.getElementsByClassName("numberButton");
	for (var i = 0 ; i < numberButtons.length; i++) {
		numberButtons[i].addEventListener("click", getNumber, false ); 
	}

	let actionButtons = document.getElementsByClassName("actionButton");
	for (var i = 0 ; i < actionButtons.length; i++) {
		actionButtons[i].addEventListener("click", setAction, false ); 
	}

	let unaryActionButtons = document.getElementsByClassName("btnUnaryAction");
	for (var i = 0 ; i < unaryActionButtons.length; i++) {
		unaryActionButtons[i].addEventListener("click", calculateUnaryAction, false ); 
	}
}