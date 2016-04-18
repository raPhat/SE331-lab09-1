(function () {
  'use strict';
  angular
    .module('labApp')
    .factory('UrlLanguageStorage', urlLanguageStorage);


  /** @ngInject */
  function urlLanguageStorage($location) {
    return {
      put: function (name, value) {
      },
      get: function (name) {
        return $location.search()['lang']
      }
    };
  };
})();
