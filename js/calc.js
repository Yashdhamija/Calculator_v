

// const sin = document.getElementById("sin");
// console.log(sin);
// const sq_root = document.getElementById("sq-root");
// console.log(sq_root);

// vars for storing operands (number inputs)
let input1 = '';
let input2 = '';
// flag whether theres a operation to perform
let op_flag = false;
// operator
let operator = '';

// Function called by number buttons and decimal point only
const getNumber = (element) => {
	let display = document.getElementById("calcDisplay");
	let displayedValue = display.innerHTML;
	let input = element.target.innerHTML;

	// If no number has been pressed, displayed the pressed number
	if (displayedValue === "0" && input != "0") {
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

	display.innerHTML = displayedValue;
}

// Add event listeners when the whole page has been loaded
window.onload = () => {
	let btns = document.getElementsByClassName("numberButton");

	for (var i = 0 ; i < btns.length; i++) {
		btns[i].addEventListener("click", getNumber, false ); 
	}
}