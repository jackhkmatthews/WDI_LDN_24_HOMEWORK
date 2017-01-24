angular
  .module('beersApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$state'];
function MainCtrl($state){
  console.log('MainCtrl');
  const vm = this;

  vm.search = search;

  function search(){
    console.log(vm.searchTerm);
    $state.go('beersSearch', {searchTerm: vm.searchTerm});
  }
}
