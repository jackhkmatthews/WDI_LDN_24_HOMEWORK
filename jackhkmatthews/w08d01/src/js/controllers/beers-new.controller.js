angular
  .module('beersApp')
  .controller('BeersNewCtrl', BeersNewCtrl);

BeersNewCtrl.$inject = ['$http', 'API', '$state'];
function BeersNewCtrl($http, API, $state){
  console.log('BeersNewCtrl');
  const vm = this;
  vm.beersCreate = beersCreate;

  function beersCreate(){
    $http
    .post(`${API}/beers`, vm.newBeer)
    .then(response => {
      console.log(response);
      $state.go('beersIndex');
    });
  }
}
