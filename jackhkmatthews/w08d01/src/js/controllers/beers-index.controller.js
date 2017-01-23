angular
  .module('beersApp')
  .controller('BeersIndexCtrl', BeersIndexCtrl);

BeersIndexCtrl.$inject = ['$http', 'API'];
function BeersIndexCtrl($http, API){
  console.log('BeersIndexCtrl');

  const vm = this;
  vm.beersDelete = beersDelete;

  $http
  .get(`${API}/beers`)
  .then(response => {
    console.log(response);
    vm.beers = response.data.beers;
  });

  function beersDelete(beer){
    const index = vm.beers.indexOf(beer);
    vm.beers.splice(index, 1);
    $http
    .delete(`${API}/beers/${beer._id}`)
    .then(response => {
      console.log(response);
    });
  }

}
