////////////////////////////////////////////////
//////////////noughts and crosses///////////////
////////////////////////////////////////////////

//the board IDs
// box0 box1 box2
// box3 box4 box5
// box6 box7 box8

var xIsNext                = true;
var playerXBoxes           = [];
var playerNaughtBoxes      = [];
var winningBoxCombinations = [['box0','box1','box2'],['box3','box4','box5'],['box6','box7','box8'],['box0','box3','box6'],['box1','box4','box7'],['box2','box5','box8'],['box0','box4','box8'],['box2','box4','box6']];
var xScore                 = 0;
var naughtScore            = 0;
var isExpanded             = false;
var boxes, appContainer, xScoreElement, naughtScoreElement, xScoreContainer, naughtScoreContainer;

window.onload = app;

function app() {

  var expandButton       = document.getElementById('title-container');
  appContainer           = document.getElementById('app-container');
  boxes                  = document.getElementsByClassName('box');
  xScoreElement          = document.getElementById('xScore');
  naughtScoreElement     = document.getElementById('naughtScore');
  xScoreContainer        = document.getElementById('xScoreContainer');
  naughtScoreContainer   = document.getElementById('naughtScoreContainer');
  var resetButton        = document.getElementById('reset');

  makeExpandListen(expandButton);
  makeBoxesListen();
  makeResetButtonListen(resetButton);
}

function makeExpandListen(element){
  element.addEventListener('click', onExpandClick);
}

function onExpandClick(){
  if (!isExpanded){
    appContainer.style.height = '530px';
  } else {
    appContainer.style.height = '49px';
  }
  isExpanded = !isExpanded;
}

function makeBoxesListen() {
  for (var i = 0; i < boxes.length; i ++) {
    boxes[i].addEventListener('click', onBoxClick);
  }
}

function onBoxClick(){
  var clicked = this.className.includes('clicked');
  if(!clicked){
    if(xIsNext){
      updateBox(this, 'x');
      playerXBoxes.push(this.id);
      checkForWinnerAndAlert(playerXBoxes);
      xIsNext = !xIsNext;
      updateTurnIndicator();
    } else if (!xIsNext) {
      updateBox(this, 'O');
      playerNaughtBoxes.push(this.id);
      checkForWinnerAndAlert(playerNaughtBoxes);
      xIsNext = !xIsNext;
      updateTurnIndicator();
    }
    this.className += ' clicked';
  }
}

function updateBox(box, player){
  box.innerHTML = player;
  if (player === 'O'){
    box.className += ' naught';
  } else {
    box.className += ' ' + player;
  }
}

function checkForWinnerAndAlert (playersControledBoxes) {
  for (var i = 0; i < winningBoxCombinations.length; i ++){
    var box0 = winningBoxCombinations[i][0];
    var box1 = winningBoxCombinations[i][1];
    var box2 = winningBoxCombinations[i][2];
    if (playersControledBoxes.includes(box0) && playersControledBoxes.includes(box1) && playersControledBoxes.includes(box2)){
      for (var k = 0; k < boxes.length; k ++) {
        boxes[k].className += ' not-flashing';
      }
      updateWinningBoxes(box0, box1, box2);
      unBindBoxes();
      updateScoreIndicator();
    }
  }
}

function updateWinningBoxes(box0, box1, box2){
  document.getElementById(box0).className = document.getElementById(box0).className.replace(' not-flashing', ' flashing');
  document.getElementById(box1).className = document.getElementById(box1).className.replace(' not-flashing', ' flashing');
  document.getElementById(box2).className = document.getElementById(box2).className.replace(' not-flashing', ' flashing');
}

function unBindBoxes() {
  for (var j = 0; j < boxes.length; j ++) {
    boxes[j].removeEventListener('click', onBoxClick);
    boxes[j].className = boxes[j].className.replace('hover', '');
  }
}

function updateScoreIndicator(){
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

function makeResetButtonListen(element){
  element.addEventListener('click', onResetClick);
}

function onResetClick(){
  for (var i = 0; i < boxes.length; i ++) {
    boxes[i].className = 'box hover';
    boxes[i].innerHTML = '';
  }
  playerXBoxes =[];
  playerNaughtBoxes = [];
  makeBoxesListen();
}
