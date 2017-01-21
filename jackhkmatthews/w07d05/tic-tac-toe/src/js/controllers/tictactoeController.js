angular
.module('tictactoeApp')
.controller('TictactoeController', TictactoeController);

TictactoeController.$inject = [];
function TictactoeController(){
  const vm = this;

  vm.cells = [
    {
      index: 0,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 1,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 2,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 3,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 4,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 5,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 6,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 7,
      played: false,
      text: '.',
      player: null
    },
    {
      index: 8,
      played: false,
      text: '.',
      player: null
    }
  ];
  vm.winningBoxCombinations = [
    [0, 1, 2], //rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //diagonals
    [2, 4, 6]
  ];
  vm.playerXCells = [];
  vm.playerOCells = [];
  vm.xIsNext = true;
  vm.winner = null;

  vm.log = log;
  vm.move = move;
  vm.addToPlayersMoves = addToPlayersMoves;
  vm.updateBoard = updateBoard;
  vm.checkForWinner = checkForWinner;
  vm.reset = reset;

  function log(){
    console.log('TictactoeController');
  }

  function move(cell){
    console.log(cell);
    if(!cell.played && !vm.winner){
      vm.addToPlayersMoves(cell);
      vm.updateBoard(cell);
      vm.checkForWinner();
    }
  }

  function addToPlayersMoves(cell){
    if(vm.xIsNext) vm.playerXCells.push(cell.index);
    if(!vm.xIsNext) vm.playerOCells.push(cell.index);
  }

  function updateBoard(cell){
    if(vm.xIsNext) {
      cell.text = 'x';
      cell.player = 'x';
    }
    if(!vm.xIsNext) {
      cell.text = 'o';
      cell.player = 'o';
    }
    cell.played = true;
    vm.xIsNext = !vm.xIsNext;
  }

  function checkForWinner(){
    vm.winningBoxCombinations.forEach((element) => {
      const box0 = element[0];
      const box1 = element[1];
      const box2 = element[2];
      if (vm.playerOCells.includes(box0) && vm.playerOCells.includes(box1) && vm.playerOCells.includes(box2)){
        vm.winner = 'O';
        console.log('player O wins');
      }
      if (vm.playerXCells.includes(box0) && vm.playerXCells.includes(box1) && vm.playerXCells.includes(box2)){
        vm.winner = 'X';
        console.log('player X wins');
      }
      console.log('no winner');
    });
  }

  function reset(){
    vm.winner = null;
  }

}

//on click add x or o
