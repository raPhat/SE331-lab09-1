(function () {
  'use strict';

  angular
    .module('labApp')
    .controller('languageController', languageController);

  /** @ngInject */
  function languageController($scope, $translate, $location, $locale) {
    var vm = this;
    var currentLocal = $locale.id.substring(0, 2);

    vm.currentLocale = currentLocal;
    vm.changeLanguage = function (locale) {
      $translate.use(locale);
      $location.search('lang', locale);
      vm.currentLocale = locale;
    };
  };
})();
