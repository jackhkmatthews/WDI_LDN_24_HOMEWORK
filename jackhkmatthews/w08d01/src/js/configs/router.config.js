angular
  .module('beersApp')
  .config(Router);

Router.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];
function Router($stateProvider, $urlRouterProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('beersIndex', {
      url: '/beers',
      templateUrl: '/js/views/beers/index.html',
      controller: 'BeersIndexCtrl as beersIndex'
    })
    .state('beersSearch', {
      url: '/beers/search/:searchTerm',
      templateUrl: '/js/views/beers/index.html',
      controller: 'BeersSearchCtrl as beersSearch'
    })
    .state('beersNew', {
      url: '/beers/new',
      templateUrl: '/js/views/beers/new.html',
      controller: 'BeersNewCtrl as beersNew'
    })
    .state('beersShow', {
      url: '/beers/:id',
      templateUrl: '/js/views/beers/show.html',
      controller: 'BeersShowCtrl as beersShow'
    })
    .state('beersEdit', {
      url: '/beers/:id/edit',
      templateUrl: '/js/views/beers/edit.html',
      controller: 'BeersEditCtrl as beersEdit'
    });

  $urlRouterProvider.otherwise('/beers');

}
