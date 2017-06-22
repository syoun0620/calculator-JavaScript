window.util = {};

// Calculator Exercise
//
// Write a function calc() that takes a string that represents an arithmetic
// operation (such as "3 + 2") and returns the numerical result of the
// operation.
//
// You can assume that each number or operator (i.e. + - / *) is separated by a single
// space.
//
// Part 1. If an invalid expression is given, throw an exception.
//
// ex. util.calc('') -> Error, empty expression
// ex. util.calc('1 2') -> Error, missing operator
// ex. util.calc('-') -> Error, no numbers
// ex. util.calc('1 2 +') -> Error, operator at the wrong spot
// ex. util.calc('+ 1 -18') -> Error, operator at the wrong spot
// ex. util.calc('1 + 55 -2') -> Error, too many numbers
// ex. util.calc('29 + + 1') -> Error, too many operators
// ex. util.calc('29 + 1 +') -> Error, too many operators
//
// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5
//
// Part 3. Implement support for multiplication and division.
// Note that the order of operations matters. Multiplication and division needs
// to be perfomed before addition and subtraction.
//
// ex. util.calc('1 * 3 / 5 + 2') -> 2.6
// ex. util.calc('1 + 3 / 2 - 5') -> -2.5
// ex. util.calc('5 * 6 + 8 / 9 * 4.5') -> 34
// ex. util.calc('1 / 0 + 1 * 0') -> Infinity
// ex. util.calc('1 / 0 * 0 + 1') -> NaN
//
// Bonus: Implement support for the square root operator.
// Implement support for the `sqrt` operator. `sqrt` is an operator that takes
// only one argument (i.e. a unary operator). `sqrt` applied before all other
// operators
// other operators and only operates on the value after it.
// There should be a single space before and after `sqrt`.
//
// Note: you can use the builtin Math.sqrt() function.
//
// ex. util.calc('sqrt 4') -> 2, same as Math.sqrt(4)
// ex. util.calc('sqrt 4 - 3') -> -1
// ex. util.calc('-1 * sqrt 4 - 3') -> -5
// ex. util.calc('sqrt 9 - 3 * 10') -> -27
// ex. util.calc('10 * sqrt 81') -> 90

util.calc = function(expression) {
	if (expression == ''){
		throw "Error, empty expression";
	}
	var expArray = expression.split(' ');
	var opsList = ['+', '-', '/', '*', 'sqrt'];

	var numCount = 0;
	var opCount = 0; 
	for (let i = 0; i<expArray.length; i++){
		if (expArray[i] == '+' || expArray[i] == '-' || 
			expArray[i] == '*' || expArray[i] == '/' 
			) {
			opCount++;	
		}
		else if (expArray[i] == 'sqrt'){
			continue;
		}
		else{
			numCount++;
		}
	}
	if (expArray[0] != 'sqrt' && expArray.length > 1 && opCount == 0){
		throw "Error, mission operator";
	}
	if (numCount > opCount +1){
		throw "Error, too many numbers";
	}
	if (opCount >= numCount){
		throw "Error, too many operators";
	}

	if (expArray[0] === 'sqrt'){
	  	expArray[1] = (+Math.sqrt(expArray[1]));
	  	expArray = expArray.slice(1,expArray.length);
	}

	for (var i = 1; i< expArray.length; i+=2){
		if (expArray[i-1] == 'sqrt' || expArray[i] == 'sqrt'){
			i+=2;
		}
		else if (expArray[i] != '+' && 
			expArray[i] != '-' && expArray[i] != '*' && 
			expArray[i] != '/' ){
			throw "Error, operator at the wrong spot";
			
		}
	}

	
	for (let i=0; i<expArray.length; i++){
		if (opsList.indexOf(expArray[i]) < 0) {
			expArray[i] = +expArray[i];
		} 
	}
	var newArray = [];

	

  if (expArray.length == 1){
  	if (opsList.indexOf(expArray[0]) > 0 ){
  		throw "Error, no numbers";
  	}
  	return expArray[0];
  }

  //for * and /
  newArray[0] = expArray[0];
  for (var i = 1; i< expArray.length; i += 2){
  	if (expArray[i] === '*') {
  		


  		var val1 = newArray.pop();
  		var val2 = expArray[i+1];
  		if (val2 == "sqrt"){
  			val2 = Math.sqrt(expArray[i+2]);
  			i++;
  		}
  		var result = val1*val2;
  		newArray.push(result);
  	}
  	else if (expArray[i] === '/'){
  		
  		var val1 = newArray.pop();
  		var val2 = expArray[i+1];
  		if (val2 == "sqrt"){
  			val2 = Math.sqrt(expArray[i+2]);
  			i++;
  		}
  		var result = val1/val2;
  		newArray.push(result);
  	}
  	else{
  		newArray.push(expArray[i]);
  		newArray.push(expArray[i+1]);
  	}
  }

  // for + and -
  var result = newArray[0];
	for (var i = 1; i< newArray.length; i+=2){
  		if (newArray[i] === '+'){
  			result = result + newArray[i+1];
  		}
  		else if (newArray[i] === '-'){
  			result = result - newArray[i+1];
  		}
  	}
  	return result;
};






