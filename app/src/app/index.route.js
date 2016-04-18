(function() {
  'use strict';

  angular
    .module('labApp')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider.
      when('/addProduct',{
        templateUrl: 'app/product/editProduct.html',
        controller: 'addProductController',
        controllerAs: 'vm'
      }).
      when('/editProduct/:id',{
        templateUrl: 'app/product/editProduct.html',
        controller: 'editProductController',
        controllerAs: 'vm'
      }).
      when('/listProduct',{
        templateUrl: 'app/product/productList.html',
        controller: 'listProductController',
        controllerAs: 'vm'
      }).
      when('/shoppingCart/:id',{
        templateUrl: 'app/shoppingCart/shoppingCart.html',
        controller: 'shoppingCartController',
        controllerAs: 'vm'
      }).
      otherwise({redirectTo: '/listProduct'});
  }

})();
