const MAX_NUMBER_LENGTH = 10;

// vars for storing operands (number inputs)
let input1 = 0;
let input2 = 0;
// flag whether theres a operation to perform
let calculated = true;
// operator
let operator = "";
// If set to true the input is set to the pressed number instead of appended.
// This takes affect after a binary operator button was pressed.
let clearDisplay = false;

const toggleDisplay = (element) => {
	let display = document.getElementById("calcDisplay");
	let color;

	if (element.srcElement.checked) {
		display.style.backgroundColor = "#777A07";
	}
	else {
		display.style.backgroundColor = "#242B0A";
	}
}

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
	resetState();
}

const resetState = () => {
	calculated = true;
	clearDisplay = false;
	op = "";
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
	let input = element.target.innerHTML;
	let newDisplay = "";

	// then we expecting second input
	if(clearDisplay) {
		if(input2 === 0)
			if (input == "0")
				newDisplay = "0";

			else {
				if (input === ".") {
					newDisplay = "0" + input;
				}
				else {
					newDisplay = input;
				}
			}
			
		else if (input2 != 0)
			newDisplay = display.innerHTML + input;

		input2 = Number(newDisplay);
	}
	else {
		if(input1 === 0)
			if (input == "0")
				newDisplay = "0";

			else {
				if (input === ".") {
					newDisplay = "0" + input;
				}
				else {
					newDisplay = input;
				}
			}
		else if (input1 != 0)
			newDisplay = display.innerHTML + input;

		input1 = Number(newDisplay);
	}
	// Write new number to the display
	display.innerHTML = newDisplay;;
	// Reset flag
	// clearDisplay = false;
}

const setAction = (element) => {
	// series functions e.g, 2+3-4
	if (calculated == false && operator != "") {
		// first compute result
		computeResult(operator);
		displayResult();
	}
	// Save pressed operator
	operator = element.target.dataset.action;	
	// next input is needed, this is so as to handle
	// when two data-actions are taken adjacently (input2 being 0, first function is ignored)
	input2 = 0;
	// Set flag in order to clear the display on the next number button press
	clearDisplay = true;
	calculated = false;
}

const calculateUnaryAction = (element) => {
	if (calculated == false && operator != "") {
		// first compute and display the result
		computeResult(operator);
		displayResult();
	}
	// Get unary operator
	operator = element.target.dataset.action;
	computeResult();
	displayResult();
	calculated = true;
	clearDisplay = false;
	// resetState();
}

const computeResult = (opertor) => {
	// Save resutl into input1 so another press on the "=" button repeats the action
	switch (operator) {
		case "add":
			input1 += input2;
			break;

		case "subtract":
			input1 -= input2;
			break;

		case "multiply":
			input1 *= input2;
			break;

		case "divide":
			if (input2 != 0)
				input1 /= input2;
			break;	

		case "sqrt":
			input1 = Math.sqrt(input1);
			break;
	
		// Calculation done in RAD
		case "sin":
			input1 = Math.sin(input1);
			break;	
	}
}

// displays result onto the screen
const displayResult = () => {
	let display = document.getElementById("calcDisplay");
	display.innerHTML = input1;
}

const calculate = () => {
	computeResult(operator);
	displayResult();
	clearDisplay = false;
	calculated = true;
}

// Add event listeners when the whole page has been loaded
window.onload = () => {
	document.getElementById("btnOn").addEventListener("change", toggleDisplay, false);

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