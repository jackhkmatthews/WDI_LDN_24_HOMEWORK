//welcome user
var again = prompt('Hello user.  Please type "on" to use the calculator');

//start calculator prompt and alert loop
while (again.toUpperCase() === 'YES' || again.toUpperCase() === 'ON' ){

  //define users chosen operator in order to allow toUpperCase() of 'sqrt' and to reset at the start of a new loop
  var operator = 'operator';

  //get kind of operation the user would like to use
  //prompt repeatedly until one of available operators selected
  while (operator !== '*' && operator !== '/' && operator !== '+' && operator !== '-' && operator !== '^' && operator.toUpperCase() !== 'SQRT'){
    operator = prompt('Please type *, /, +, -, ^ or SQRT to select one as your calculation operator');
  }

  //get user's first number
  var firstNumber = parseFloat(prompt('Please enter your first number'));

  //get user's second number if required (not required if sqrt selected as operator)
  if (operator.toUpperCase() !== 'SQRT') {
    var secondNumber = parseFloat(prompt('Please enter your second number'));
  }

  //calculate answer via switch case statement based on user submitted operator
  var answer;
  switch (operator.toUpperCase()) {
    case '*':
      answer = firstNumber * secondNumber;
      break;
    case '-':
      answer = firstNumber - secondNumber;
      break;
    case '/':
      answer = firstNumber / secondNumber;
      break;
    case '+':
      answer = firstNumber + secondNumber;
      break;
    case '^':
      answer = Math.pow(firstNumber, secondNumber);
      break;
    case 'SQRT':
      answer = Math.sqrt(firstNumber);
      break;
    default:
      break;
  }

  //display answer string to user depending on selected operator
  if (operator.toUpperCase() !== 'SQRT') {
    alert(firstNumber + ' ' + operator + ' ' + secondNumber + ' = ' + answer);
  } else {
    alert(operator + ' of ' + firstNumber + ' = ' + answer);
  }

  //ask user if another calculation is required and exit loop if not
  //loop exited by inital while loop condition if anything by yes is entered
  again = prompt('Type "yes" to use the calculator again.');
}
