angular
  .module('beersApp')
  .controller('BeersShowCtrl', BeersShowCtrl);

BeersShowCtrl.$inject = ['$http', '$stateParams', 'API'];
function BeersShowCtrl($http, $stateParams, API){
  console.log('BeersShowCtrl');
  const vm = this;
  const id = $stateParams.id;

  $http
  .get(`${API}/beers/${id}`)
  .then(response => {
    console.log(response);
    vm.beer = response.data.beer;
  });
}
