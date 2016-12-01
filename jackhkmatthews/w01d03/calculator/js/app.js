
// my script kept loading before my page background images, this function seemed to fix it, sorry for using a function :( .
setTimeout(function () {

  //welcome user
  var calculatorType = prompt('Hello user.  Please type "maths" to use the maths calculator.  Please type "trip" to use the trip calculator');

  //start calculator prompt and alert loop
  /////////////////////////////////////////////

  while (calculatorType.toUpperCase() === 'MATHS' || calculatorType.toUpperCase() === 'TRIP' ){

    //start maths calculator prompt and alert loop
    /////////////////////////////////////////////
    while (calculatorType.toUpperCase() === 'MATHS'){

      //define users chosen operator in order to allow toUpperCase() of 'sqrt' and to reset at the start of a new loop
      var operator = 'operator';

      //define array of available operators to allow operators to be searched for the chosen operator
      var operators = ['*', '/', '+', '-', '^', 'SQRT'];

      //get kind of operation the user would like to use
      //prompt repeatedly until one of available operators selected
      do {
        operator = prompt('Please type *, /, +, -, ^ or SQRT to select one as your calculation operator');
      } while (operators.indexOf(operator.toUpperCase()) === -1);

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

      // ask user which calculatorType is required next and exit loop if unavailable option selected
      calculatorType = prompt('Type "maths" to use the maths calculator.  Or "trip" to use the trip calculator.  Type anything else to exit.');
    }

    //start trip calculator prompt and alert loop
    /////////////////////////////////////////////
    while (calculatorType.toUpperCase() === 'TRIP'){

      //get user's distance
      var distance = parseFloat(prompt('Please enter the distance of your trip in km'));

      //get user's fuelEfficiency
      var fuelEfficiency = parseFloat(prompt('Please enter the fuel efficiency of your motor vehicle in km per litre'));

      //get user's costPerGallon
      var costPerGallon = parseFloat(prompt('Please enter the cost per litre of your feul in GBP'));

      //get user's speed
      var speed = parseFloat(prompt('Please estimate your average speed in km per hour'));

      //calculate time of trip
      var time = (distance / speed);

      //caculate cost of trip
      var cost = ((distance / fuelEfficiency) * costPerGallon);

      //round answers to the nearest 100th
      cost = (Math.round(cost * 100))/100;
      time = (Math.round(time * 100))/100;

      //display answer string to user
      alert('Your trip will cost £' + cost + ' and take ' + time + ' hours.');

      // ask user which calculatorType is required next and exit loop if unavailable option selected
      calculatorType = prompt('Type "maths" to use the maths calculator.  Or "trip" to use the trip calculator.  Type anything else to exit.');
    }
  }
}, 1000);





speak('hello');

function speak(words) {
  console.log(words);
}

speak('hello');
speakMore('more');

var speakMore = function(moreWords) {
  console.log(moreWords);
};

speakMore('more');
