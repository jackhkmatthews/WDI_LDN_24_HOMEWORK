angular
  .module('tictactoeApp')
  .controller('TictactoeController', TictactoeController);

TictactoeController.$inject = [];
function TictactoeController(){
  const vm = this;

  vm.log = function(){
    console.log('TictactoeController');
  };

  vm.log();
}
