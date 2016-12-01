//when users clicks = get firstNumber, operator and secondNumber, calculate the answer and print out to output

//make sure document has loaded first
console.log('hi');

window.onload = app;

function app() {

  console.log('hi');

  //get form element
  var form = document.getElementById('calculatorForm');

  //make submit listen
  form.addEventListener('submit', function(e) {

    //remove default behavior
    e.preventDefault();

    //get firstNumber value
    var firstNumber =  parseFloat(document.getElementById('firstNumber').value);

    //get operator value
    var operator = document.getElementById('operator').value;

    //get secondNumber value
    var secondNumber =  parseFloat(document.getElementById('secondNumber').value);

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

  }); //end event listener

}
