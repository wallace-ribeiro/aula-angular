(function() {

  angular.module('myApp')
  .controller('LoginController', ['$scope', 'LoginService', function($scope, LoginService) {
    $scope.logar = () => {
      LoginService.login($scope.login, $scope.senha);
    };
  }]);
})();
