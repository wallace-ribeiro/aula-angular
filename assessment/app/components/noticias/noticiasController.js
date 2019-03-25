(function() {

  angular.module('myApp')
  .controller('NoticiasController', ['$scope', 'NoticiasService', function($scope, NoticiasService) {
    $scope.getNoticias = () => {
      return NoticiasService.getNoticias();
    }
  }]);
})();
