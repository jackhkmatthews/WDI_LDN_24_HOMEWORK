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

  var expandButton           = document.getElementById('title-container');
  var isExpanded             = false;
  var appContainer           = document.getElementById('app-container');
  var boxes                  = document.getElementsByClassName('box');
  var xScoreElement          = document.getElementById('xScore');
  var naughtScoreElement     = document.getElementById('naughtScore');
  var xScore                 = 0;
  var naughtScore            = 0;
  var xScoreContainer        = document.getElementById('xScoreContainer');
  var naughtScoreContainer   = document.getElementById('naughtScoreContainer');
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

  //make expandButton listen for click and expand on click
  expandButton.addEventListener('click', function(){
    if (!isExpanded){
      appContainer.style.height = '530px';
    } else {
      appContainer.style.height = '49px';
    }
    isExpanded = !isExpanded;
  });

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

  //boxes click event callback function
  function onBoxClick(){
    //if box has already been clicked (class includes 'clicked')
    var clicked = this.className.includes('clicked');
    if(!clicked){
      //if xIsNext variable is true
      if(xIsNext){
        //set box inner html to x and add class for player who clicked
        updateBox(this, 'x');
        //store playerX's move in playerXBoxes
        playerXBoxes.push(this.id);
        //check if x has won
        checkForWinner(playerXBoxes);
        //reverse xIsNext
        xIsNext = !xIsNext;
        //change turn indicator div classes
        updateTurnIndicator();
      //else if 0 is next
      } else if (!xIsNext) {
        //set box inner html to 0, add class background black and color white
        updateBox(this, 'O');
        //and store playerNaught's move in playerNaughtBoxes
        playerNaughtBoxes.push(this.id);
        //test if 0 has won
        checkForWinner(playerNaughtBoxes);
        //reverse xIsNextVariable
        xIsNext = !xIsNext;
        //set turn indicator innerhtml to "X is next"
        updateTurnIndicator();
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
    if (player === 'O'){
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
        //add not-flashing class to appropriate boxes
        for (var k = 0; k < boxes.length; k ++) {
          boxes[k].className += ' not-flashing';
        }
        //replace alert / flashing class on appropriate winning boxes
        updatedWinningBoxes(box0, box1, box2);
        //unbind box click event to prevent users playing (restrict user interaction)
        for (var j = 0; j < boxes.length; j ++) {
          boxes[j].removeEventListener('click', onBoxClick);
          //remove hover className from boxes
          boxes[j].className = boxes[j].className.replace('hover', '');
        }
        updateScoreIndicator();
      }
    }
  }

  function updatedWinningBoxes(box0, box1, box2){
    document.getElementById(box0).className = document.getElementById(box0).className.replace(' not-flashing', ' flashing');
    document.getElementById(box1).className = document.getElementById(box1).className.replace(' not-flashing', ' flashing');
    document.getElementById(box2).className = document.getElementById(box2).className.replace(' not-flashing', ' flashing');
  }

  function updateScoreIndicator(){
    //update appropriate score indicator
    if (!xIsNext){
      naughtScore += 1;
      naughtScoreElement.innerHTML = naughtScore;
    } else if (xIsNext) {
      xScore += 1;
      xScoreElement.innerHTML = xScore;
    }
  }

  function updateTurnIndicator(){
    xScoreContainer.className = xScoreContainer.className.replace('next-turn', '');
    naughtScoreContainer.className = naughtScoreContainer.className.replace('next-turn', '');
    if (xIsNext){
      xScoreContainer.className += ' next-turn';
    } else if (!xIsNext){
      naughtScoreContainer.className += ' next-turn';
    }
  }

  //reset button should clear board and make lis listen again
  function onResetClick(){
    //reset all box classes and html
    for (var i = 0; i < boxes.length; i ++) {
      boxes[i].className = 'box hover';
      boxes[i].innerHTML = '';
    }
    //impty players controlled boxes
    playerXBoxes =[];
    playerNaughtBoxes = [];
    //make lis listen again
    makeBoxesListen(onBoxClick);
  }

}//end of onload app
