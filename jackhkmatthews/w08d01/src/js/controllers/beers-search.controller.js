angular
  .module('beersApp')
  .controller('BeersSearchCtrl', BeersSearchCtrl);

BeersSearchCtrl.$inject = ['$http', '$stateParams', 'API'];
function BeersSearchCtrl($http, $stateParams, API){
  const vm         = this;
  const searchTerm = $stateParams.searchTerm;

  vm.beersDelete   = beersDelete;

  $http
  .get(`${API}/beers/search/${searchTerm}`)
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
