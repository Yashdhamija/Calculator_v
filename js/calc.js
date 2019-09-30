

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

// function to take input
// takes the input and appends it to the current display
const getInput  = (ele) => {
	
	const key = ele.target;
	const action = key.dataset.action;
	let display = document.getElementById("calcDisplay");
	let currentVal = Number(display.innerHTML);

	if(!action) {
		let newDisplay = '';
		let input = ele.target.innerHTML;

		if(currentVal) 
			newDisplay += currentVal;
		newDisplay += input;

		// if a operator is active i.e, 2nd input is being typed
		if (operator) {
			input2 = Number(newDisplay);
		}
		// else still first input
		else {
			input1 = Number(newDisplay);
		}
		display.innerHTML = newDisplay;
	}
	else {
		if(action == "calculate") {
			display.innerHTML = input1+input2;
			return;
		}
		display.innerHTML = 0;
	}
}

// Add event listeners when the whole page has been loaded
window.onload = () => {
	let btns = document.getElementsByClassName("calc-btns");
	
	for (var i = 0 ; i < btns.length; i++) {
	btns[i].addEventListener("click", getInput, false ); 
	}
}