console.log("js loaded");

////////////////////////////////////////////////
//////////////noughts and crosses///////////////
////////////////////////////////////////////////

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

  //get all boxes
  var boxes = document.getElementsByClassName('box');

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
