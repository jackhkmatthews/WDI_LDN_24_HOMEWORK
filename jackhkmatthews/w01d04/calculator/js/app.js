//declaring value getting function

function getElementValueByID(id, parse) {
  if (parse){
    return parseFloat(document.getElementById(id).value);
  } else {
    return document.getElementById(id).value;
  }
}

//declaring function to be added to form listen on submit

function formSubmit(e) {
  //remove default behavior
  e.preventDefault();
  //get firstNumber, operator and secondNumber values
  var firstNumber = getElementValueByID('firstNumber', true);
  var operator = getElementValueByID('operator', false);
  var secondNumber = getElementValueByID('secondNumber', true);
  //calculate answer
  var answer;
  switch (operator) {
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
    default:
      break;
  }
  //print answer to output
  var output = document.getElementById('output');
  output.innerHTML = answer;
  //log form submitted
  console.log('Form submitted');
}

//declare app function which will find form and make it listen

function app() {
  //get form element
  var form = document.getElementById('calculatorForm');
  //make submit listen
  form.addEventListener('submit', formSubmit);
}

//run app when page loaded

window.onload = app;
