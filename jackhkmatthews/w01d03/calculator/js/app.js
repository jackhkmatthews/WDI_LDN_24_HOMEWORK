//welcome user
var again = prompt('Hello user.  Please type "on" to use the calculator');

//start loop
while (again.toUpperCase() === 'YES' || again.toUpperCase() === 'ON' ){

  //define operator
  var operator = 'operator';

  //get kind of operation would the user like to use
  while (operator !== '*' && operator !== '/' && operator !== '+' && operator !== '-' && operator !== '^' && operator.toUpperCase() !== 'SQRT'){
    operator = prompt('Please type *, /, +, -, ^ or SQRT to select one as your calculation operator');
  }

  //get users first number
  var firstNumber = parseFloat(prompt('Please enter your first number'));

  //get users second number if required
  if (operator.toUpperCase() !== 'SQRT') {
    var secondNumber = parseFloat(prompt('Please enter your second number'));
  }

  //calculate answer
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

  //display answer to user depending on selceted operator
  if (operator.toUpperCase() !== 'SQRT') {
    alert(firstNumber + ' ' + operator + ' ' + secondNumber + ' = ' + answer);
  } else {
    alert(operator + ' of ' + firstNumber + ' = ' + answer);
  }

  //ask user if another calculation is required and exit loop if not required
  again = prompt('Type "yes" to use the calculator again.');
}
