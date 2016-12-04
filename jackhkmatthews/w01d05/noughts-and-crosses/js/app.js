//wait for doc to load
window.onload = app;

function app() {

  ////////////////////////////////////////////////
  //////////////noughts and crosses///////////////
  ////////////////////////////////////////////////

  //the board
  // box0 box1 box2
  // box3 box4 box5
  // box6 box7 box8

  //get all boxes, turn indicator and reset button.
  //set xIsNext variable to true
  //create players to allow storage of 'moves' i.e which lis are in thier name
  //wining combinations of boxes - player 'controls' these boxes to win

  var boxes                  = document.getElementsByClassName('box');
  var turnIndicator          = document.getElementById('turnIndicator');
  var resetButton            = document.getElementById('reset');
  var xIsNext                = true;
  var playerXBoxes           =[];
  var playerNaughtBoxes      = [];
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

  //make each box listen for clicks with onBoxClick callback
  makeBoxesListen(onBoxClick);

  //make reset button listen for clicks with onResetClick callback
  resetButton.addEventListener('click', onResetClick);

  //make boxes listen function
  function makeBoxesListen(func) {
    for (var i = 0; i < boxes.length; i ++) {
      boxes[i].addEventListener('click', func);
    }
  }

  //boxes click event function
  function onBoxClick(){
    //if box has already been clicked (class includes 'clicked')
    var clicked = this.className.includes('clicked');
    if(!clicked){
      //if xIsNext variable is true
      if(xIsNext){
        //set box inner html to 0, add class background black and color white
        updateBox(this, 'x');
        //store playerX's move in playerXBoxes
        playerXBoxes.push(this.id);
        //check if x has won
        checkForWinner(playerXBoxes);
        //reverse xIsNext
        xIsNext = !xIsNext;
        //set turn indicator innerhtml to "0 is next"
        updateTurnIndicator(0);
      //else if 0 is next
      } else if (!xIsNext) {
        //set box inner html to 0, add class background black and color white
        updateBox(this, 0);
        //and store playerNaught's move in playerNaughtBoxes
        playerNaughtBoxes.push(this.id);
        //test if 0 has won
        checkForWinner(playerNaughtBoxes);
        //reverse xIsNextVariable
        xIsNext = !xIsNext;
        //set turn indicator innerhtml to "X is next"
        updateTurnIndicator('x');
      }
      //add clicked class to li
      this.className += ' clicked';
    } else if (clicked){
      //do nothing if box has already been clicked
    }
  }

  //update html and class of boxes
  function updateBox(box, player){
    box.innerHTML = player;
    if (player === 0){
      box.className += ' naught';
    } else {
      box.className += ' ' + player;
    }
  }

  //function to check each players contorled boxes for a winning combination
  function checkForWinner (playersControledBoxes) {
    //get each array from the winning combination array of arrays
    for (var i = 0; i < winningBoxCombinations.length; i ++){
      //winning boxes currently being tested
      var box0 = winningBoxCombinations[i][0];
      var box1 = winningBoxCombinations[i][1];
      var box2 = winningBoxCombinations[i][2];
      //test if all above winning boxes are in playersControledBoxes
      if (playersControledBoxes.includes(box0) && playersControledBoxes.includes(box1) && playersControledBoxes.includes(box2)){
        //add alert / flashing class to appropriate boxes
        document.getElementById(box0).className += ' flashing';
        document.getElementById(box1).className += ' flashing';
        document.getElementById(box2).className += ' flashing';
        //unbind box click event to prevent users playing (restrict user interaction)
        for (var j = 0; i < boxes.length; j ++) {
          boxes[j].removeEventListener('click', onBoxClick);
        }
      }
    }
  }

  function updateTurnIndicator(player){
    turnIndicator.innerHTML = player + ' is next';
  }

  //reset button should clear board and make lis listen again
  function onResetClick(){
    //reset all box classes and html
    for (var i = 0; i < boxes.length; i ++) {
      boxes[i].className = 'box';
      boxes[i].innerHTML = '';
    }
    //impty players controlled boxes
    playerXBoxes =[];
    playerNaughtBoxes = [];
    //make lis listen again
    makeBoxesListen(onBoxClick);
  }

}//end of onload app
