(function () {
  'use strict';

  angular
    .module('labApp')
    .controller('addProductController', addProductController)
    .controller('listProductController', listProductController)
    .controller('editProductController', editProductController);

  /** @ngInject */
  function addProductController($scope, $http, $location, $rootScope, productService) {
    var vm = this;
    vm.product = {};
    vm.addPerson = true;
    vm.editPerson = false;
    vm.addProduct = function (flowFiles) {
      productService.save(vm.product, function (data) {
        // after adding the object, add a new picture
        // get the product id which the image will be addded
        var productid = data.id;
        // set location
        flowFiles.opts.target = 'http://localhost:8080/productImage/add';
        flowFiles.opts.testChunks = false;
        flowFiles.opts.query = {productid: productid};
        flowFiles.upload();

        $rootScope.addSuccess = true;
        $location.path("listProduct");
        $scope.$apply();
      });
    }

  };

  /** @ngInject */
  function listProductController($scope, $http, $rootScope, productService, $route, totalCalService, queryProductService) {
    //$http.get("/product/").success(function (data) {
    var vm = this;
    var data = productService.query(function () {
      // $scope.totalNetPrice= totalCalService.getTotalNetPrice(data);
      vm.products = data;
    });
    $scope.$on('$locationChangeStart', function (event) {
      $rootScope.addSuccess = false;
      $rootScope.editSuccess = false;
      $rootScope.deleteSuccess = false;
    });

    vm.deleteProduct = function (id) {
      var answer = confirm("Do you want to delete the product?");
      if (answer) {
        productService.delete({id: id}, function () {
          $rootScope.deleteSuccess = true;
          $route.reload();
        })
      }
    };

    vm.searchProduct = function (name) {
      queryProductService.query({name: name}, function (data) {
        vm.products = data;
      });
    };

  };

  /** @ngInject */
  function editProductController($scope, $http, $routeParams, $location, $rootScope, productService) {
    var vm = this;
    vm.addPerson = false;
    vm.editPerson = true;
    var id = $routeParams.id;
    $http.get("/product/" + id).success(function (data) {
      vm.product = data;
    });

    vm.editProduct = function () {
      //$http.put("/product", $scope.product).then(function () {
      productService.update({id: vm.product.id}, vm.product, function () {
        $rootScope.editSuccess = true;
        $location.path("listProduct");
      });
    }
  };
})();
