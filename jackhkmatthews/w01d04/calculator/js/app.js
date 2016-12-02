//run app when page loaded

window.onload = app;

//declare app function which will find form and make it listen

function app() {
  //get form element and make submit listen
  document.getElementById('calculatorForm').addEventListener('submit', formSubmit);
}

//declaring function to be added to form listen on submit

function formSubmit(e) {
  //remove default behavior
  e.preventDefault();
  //get firstNumber, operator and secondNumber values
  var firstNumber  = getElementValueByID('firstNumber', 'parse');
  var operator     = getElementValueByID('operator');
  var secondNumber = getElementValueByID('secondNumber', 'parse');
  //calculate answer and print
  switch (operator) {
    case '*':
      print(multiply(firstNumber, secondNumber));
      break;
    case '-':
      print(subtract(firstNumber, secondNumber));
      break;
    case '/':
      print(divide(firstNumber, secondNumber));
      break;
    case '+':
      print(add(firstNumber, secondNumber));
      break;
    default:
      break;
  }
  // //print answer to output
  // var output = document.getElementById('output');
  // output.innerHTML = answer;
  // //log form submitted
  // console.log('Form submitted');
}

//declaring value getting function

function getElementValueByID(id, parse) {
  if (parse === 'parse'){
    return parseFloat(document.getElementById(id).value);
  } else {
    return document.getElementById(id).value;
  }
}

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function print (answer) {
  var output = document.getElementById('output');
  output.innerHTML = answer;
}
