Font downloaded from https://www.fontspace.com/cedders/segment7.

Features
a) Enable / Disable display
b) binary operation - Add, Subtract, Multiply, Divide
c) unary operation - square root, sin

Functionalty:

ENABLE / DISABLE DISPLAY
Click on the "ON" button to enable the display of the calculator. Click again to disable it.

UNARY OP
1. first you enter a number
2. click on unary button, and the result is displayed on screen

Special Case:
	Performing multiple unary operations in series (mixed with "=" button) is supported corresponding to real Casio calculator.
	E.g, 16 sqrt sqrt -> 2 OR 16 sqrt = -> 2 OR 16 sqrt = sqrt -> 1.4

BINARY OP
1. First operand is entered, then the operator and in the end the second operand, and then the result is computed and displayed on click of "=" button.
   
Special Case1:   
	Performing operations in series is handled.
	E.g, 2+3-4*2*2sqrt= -> would give 2 as computed based on left to right as in a real calcultor. 

Special Case2: 
	Additionally, when "=" is hit in series. This situation is also handled as in with a real calculator.
	E.g, 2+3=== => 11. first computation is performed then subsequent adjacent are performed by using result as first variable and input2 as it is.

NOTE**
	To handle the cases above, the input is updated live with every button press. Therefore, there was a trade-off with decimal values.
	Decimal values with a leading 0 (0.3, 0.04, ...) are not supported.