console.log('js loaded');

////////////////////////////////////////////////
//////////////noughts and crosses///////////////
////////////////////////////////////////////////

//get all boxes
var boxes = document.getElementsByClassName('box');

//wait for doc to load
window.onload = app;

function app() {

  console.log('doc loaded');

  //set xIsNext variable to true
  var xIsNext = true;

  //populate turn indicator
  var turnIndicator = document.getElementById('turnIndicator');
  turnIndicator.innerHTML = 'x is next';

  //when li clicked should mark box as black or white depeding on whose turn it is, the same cell cannot be clicked twice before cleared

  //make each li listen for clicks with for loop
  for (var i = 0; i < boxes.length; i ++) {
    boxes[i].addEventListener('click', function(){
      //if innerHTML is empty/false
      if(this.innerHTML === '.'){
        //if xIsNext variable is true
        if(xIsNext){
          //set li inner html to x and add class background white and color black
          this.innerHTML = 'x';
          this.className += ' x';
        //else
        } else {
          //set li inner html to 0 and add class background black and color white
          this.innerHTML = '0';
          this.className += ' naught';
        }
        //reverse xIsNextVariable
        xIsNext = !xIsNext;
        //if xIsNextVariable is true
        if (xIsNext){
          //set turn indicator innerhtml to "X is next"
          turnIndicator.innerHTML = 'x is next';
        //else
        } else {
          //set turn indicator innerhtml to "0 is next"
          turnIndicator.innerHTML = '0 is next';
        }
      //else
        //do nothing
      }
      checkAndAlertAndUnbind()
    });
  }

  //clear button should clear board

    //make clear button listen
  var resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function(){
    //if clicked replace innerHTML of all lis with '.'
    for (var i = 0; i < boxes.length; i ++) {
      boxes[i].innerHTML = '.';
      //remove all color classes (maybe remove last class)
      boxes[i].className = 'box';
    }
  });
}

//alert the user if there is a winner by  flashing winning boxes
//function to check if winning combination exists
function checkAndAlertAndUnbind(){
  //create isWinner variable and set to false
  var isWinner = false;
  //create an empty array of boxinnerHTML
  var boxesInnerHtml = [];
  //populate with innerHTML
  for (var i = 0; i < boxes.length; i ++) {
    boxesInnerHtml.push(boxes[i].innerHTML);
  }
  //winning conditions switch case if one is true then flash boxes
  switch (true) {
    //rows
    case boxesInnerHtml[0] === boxesInnerHtml[1] && boxesInnerHtml[0] === boxesInnerHtml[2] && boxesInnerHtml[0] !== '.':
      console.log('winner');
      boxes[0].className += ' flashing';
      boxes[1].className += ' flashing';
      boxes[2].className += ' flashing';
      break;
    case boxesInnerHtml[3] === boxesInnerHtml[4] && boxesInnerHtml[3] === boxesInnerHtml[5] && boxesInnerHtml[3] !== '.':
      console.log('winner');
      boxes[3].className += ' flashing';
      boxes[4].className += ' flashing';
      boxes[5].className += ' flashing';
      break;
    case boxesInnerHtml[6] === boxesInnerHtml[7] && boxesInnerHtml[6] === boxesInnerHtml[8] && boxesInnerHtml[6] !== '.':
      console.log('winner');
      boxes[6].className += ' flashing';
      boxes[7].className += ' flashing';
      boxes[8].className += ' flashing';
      break;
    //columns
    case boxesInnerHtml[0] === boxesInnerHtml[3] && boxesInnerHtml[0] === boxesInnerHtml[6] && boxesInnerHtml[0] !== '.':
      console.log('winner');
      boxes[0].className += ' flashing';
      boxes[3].className += ' flashing';
      boxes[6].className += ' flashing';
      break;
    case boxesInnerHtml[1] === boxesInnerHtml[4] && boxesInnerHtml[1] === boxesInnerHtml[7] && boxesInnerHtml[1] !== '.':
      console.log('winner');
      boxes[1].className += ' flashing';
      boxes[4].className += ' flashing';
      boxes[7].className += ' flashing';
      break;
    case boxesInnerHtml[2] === boxesInnerHtml[5] && boxesInnerHtml[2] === boxesInnerHtml[8] && boxesInnerHtml[2] !== '.':
      console.log('winner');
      boxes[2].className += ' flashing';
      boxes[5].className += ' flashing';
      boxes[8].className += ' flashing';
      break;
    //diagonals
    case boxesInnerHtml[0] === boxesInnerHtml[4] && boxesInnerHtml[0] === boxesInnerHtml[8] && boxesInnerHtml[0] !== '.':
      console.log('winner');
      boxes[0].className += ' flashing';
      boxes[4].className += ' flashing';
      boxes[8].className += ' flashing';
      break;
    case boxesInnerHtml[2] === boxesInnerHtml[4] && boxesInnerHtml[2] === boxesInnerHtml[6] && boxesInnerHtml[2] !== '.':
      console.log('winner');
      boxes[2].className += ' flashing';
      boxes[4].className += ' flashing';
      boxes[6].className += ' flashing';
      break;
    default:
      break;
  }
  for (var j = 0; j < boxes.length; j ++) {
    boxes[j].addEventListener('click', function(){
    });
  }
}
