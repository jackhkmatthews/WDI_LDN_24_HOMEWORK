


(function(){
  angular
    .module('tagAnything', [
      'ui.router',
      'ngResource'
    ])
    .config(Router)
    .factory('Product', productFactory)
    .controller('productsIndexController', productsIndexController)
    .controller('productsShowController', productsShowController)
    .provider('MyProvider', MyProvider);

  function MyProvider(){

    console.log('My Provider');

    this.$get = function(){
      return 'My Value';
    };
  }

  Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state('productsIndex', {
      url: '/',
      templateUrl: 'html/products-index.html',
      controller: 'productsIndexController',
      controllerAs: 'pIndexVM'
    })
    .state('show', {
      url: '/products/:name',
      templateUrl: 'html/products-show.html',
      controller: 'productsShowController',
      controllerAs: 'pShowVM'
    });
    $urlRouterProvider.otherwise('/');
  }

  productFactory.$inject = ['$resource'];
  function productFactory($resource){
    const Product = $resource('api/products/:name', {}, {
      update: {method: 'PATCH'}
    });
    return Product;
  }

  productsIndexController.$inject = ['Product', 'MyProvider'];
  function productsIndexController(Product, MyProvider){
    console.log('MyProvider inside IndexController: ', MyProvider);
    const vm = this;
    vm.products = Product.query();
    vm.create = () => {
      Product.save(vm.newProduct, (response) => {
        vm.products.push(response);
      });
    };
  }

  productsShowController.$inject = ['$stateParams', 'Product', '$state'];
  function productsShowController($stateParams, Product, $state){
    console.log('MyProvider inside ShowController: ', MyProvider);
    const vm = this;
    vm.product = Product.get({name: $stateParams.name});

    vm.delete = () => {
      Product.remove({name: $stateParams.name}, () => {
        $state.go('productsIndex');
      });
    };

    vm.update = () => {
      Product.update({name: $stateParams.name}, vm.product, (response) => {
        $state.go('show', {name: response.name});
      });
    };
  }
})();
