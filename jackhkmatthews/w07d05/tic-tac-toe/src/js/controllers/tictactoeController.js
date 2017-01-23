angular
.module('tictactoeApp')
.controller('TictactoeController', TictactoeController);

TictactoeController.$inject = [];
function TictactoeController(){
  const vm = this;

  vm.landing = true;
  vm.cells = [
    {
      index: 0,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 1,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 2,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 3,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 4,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 5,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 6,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 7,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
    },
    {
      index: 8,
      played: false,
      html: '.',
      playerX: false,
      playerO: false,
      winner: false
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

  vm.move = move;
  vm.addToPlayersMoves = addToPlayersMoves;
  vm.updateBoard = updateBoard;
  vm.checkForWinner = checkForWinner;
  vm.attributeWinningClass = attributeWinningClass;
  vm.reset = reset;

  function move(cell){
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
      cell.html = 'x';
      cell.playerX = true;
    }
    if(!vm.xIsNext) {
      cell.html = '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
      cell.playerO = true;
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
        vm.attributeWinningClass(box0, box1, box2);
        vm.winner = true;
        console.log('player O wins');
      }
      if (vm.playerXCells.includes(box0) && vm.playerXCells.includes(box1) && vm.playerXCells.includes(box2)){
        vm.attributeWinningClass(box0, box1, box2);
        vm.winner = true;
        console.log('player X wins');
      }
    });
  }

  function attributeWinningClass(box0, box1, box2){
    vm.cells[box0].winner = true;
    vm.cells[box1].winner = true;
    vm.cells[box2].winner = true;
  }

  function reset(){
    vm.winner = null;
    vm.playerXCells = [];
    vm.playerOCells = [];
    vm.cells = [
      {
        index: 0,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 1,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 2,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 3,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 4,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 5,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 6,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 7,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      },
      {
        index: 8,
        played: false,
        html: '.',
        playerX: false,
        playerO: false,
        winner: false
      }
    ];
  }

}

//on click add x or o
