angular
  .module('beersApp')
  .controller('BeersEditCtrl', BeersEditCtrl);

BeersEditCtrl.$inject =['$http', '$stateParams', 'API', '$state'];
function BeersEditCtrl($http, $stateParams, API, $state){
  const vm = this;
  const id = $stateParams.id;

  vm.beersUpdate = beersUpdate;

  $http
  .get(`${API}/beers/${id}`)
  .then(response => {
    vm.beer = response.data.beer;
  });

  function beersUpdate(){
    $http
    .put(`${API}/beers/${id}`, vm.beer)
    .then(response => {
      console.log(response);
      $state.go('beersShow', {id: id});
    });
  }
}
