console.log('js loaded');

////////////////////////////////////////////////
//////////////noughts and crosses///////////////
////////////////////////////////////////////////

//the board
// box0 box1 box2
// box3 box4 box5
// box6 box7 box8

//get all boxes
var boxes = document.getElementsByClassName('box');

//create players to allow storage of 'moves' i.e which lis are in thier name
var playerXBoxes =[];
var playerNaughtBoxes = [];

//wining combinations of boxes
//if a player 'controls' these boxes they have won
var winningBoxCombinations = [
                          ['box0', 'box1', 'box2'], //rows
                          ['box3', 'box4', 'box5'],
                          ['box6', 'box7', 'box8'],
                          ['box0', 'box3', 'box6'], //columns
                          ['box1', 'box4', 'box7'],
                          ['box2', 'box5', 'box8'],
                          ['box0', 'box4', 'box8'], //diagonals
                          ['box2', 'box4', 'box6']
];

//wait for doc to load
window.onload = app;

function app() {

  console.log('doc loaded');

  //set xIsNext variable to true
  var xIsNext = true;

  //populate turn indicator
  var turnIndicator = document.getElementById('turnIndicator');
  turnIndicator.innerHTML = 'x is next';

  //when li clicked should mark box as black or white depeding on whose turn it is, the same cell cannot be clicked twice before cleared. should also check for winner

  //make each li listen for clicks with for loop
  for (var i = 0; i < boxes.length; i ++) {
    boxes[i].addEventListener('click', function(){
      //if li has already been clicked (class includes 'clicked')
      var clicked = this.className.includes('clicked');
      if(!clicked){
        //if xIsNext variable is true
        if(xIsNext){
          //set li inner html to x, add class background white and color black
          //and store playerX's move in playerXBoxes
          this.innerHTML = 'x';
          this.className += ' x';
          playerXBoxes.push(this.id);
        //else
        } else {
          //set li inner html to 0, add class background black and color white
          //and store playerNaught's move in playerNaughtBoxes
          this.innerHTML = '0';
          this.className += ' naught';
          playerNaughtBoxes.push(this.id);
        }
        //reverse xIsNextVariable
        xIsNext = !xIsNext;
        //if xIsNextVariable is true
        if (xIsNext){
          //set turn indicator innerhtml to "X is next"
          turnIndicator.innerHTML = 'x is next';
          //test if 0 has won
          checkForWinner(playerNaughtBoxes);
        //else
        } else {
          //set turn indicator innerhtml to "0 is next"
          turnIndicator.innerHTML = '0 is next';
          //check if x has won
          checkForWinner(playerXBoxes);
        }
        //add clicked class to li
        this.className += ' clicked';
      } //else do nothing
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

//function to check each players contorled boxes for a winning combination
function checkForWinner (playersControledBoxes) {
  //get each array from the winnig combination array of arrays
  for (var i = 0; i < winningBoxCombinations.length; i ++){
    console.log('entered first for loop');
    //get each element from that nested array (e.g each box ID in one of the row winning conditios)
    var winningBoxCombination = winningBoxCombinations[i];
    console.log(winningBoxCombination);
    //declare controlledWinningBoxes
    var controlledWinningBoxes = 0;
    for (var j = 0; j < winningBoxCombination.length; j ++){
      console.log('entered second for loop');
      //test if each element in turn is included in the players controlled boxes array
      if (playersControledBoxes.includes(winningBoxCombination[j])){
        //if included, add 1 to controlledWinningBoxes
        controlledWinningBoxes += 1;
        console.log('controlledWinningBoxes: ' + controlledWinningBoxes);
        //if three elements have been found we have a winner, console log
        if (controlledWinningBoxes === 3){
          console.log('winner');
        } else {
          console.log('no winner');
          console.log('controlled winning boxes: ' + controlledWinningBoxes);
        }
      }
    }
  }
}
