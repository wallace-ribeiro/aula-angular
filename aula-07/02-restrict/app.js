(function() {

  angular.module('myApp', [])
  .controller('Controller', ['$scope', function($scope) {
    $scope.customer = {
      name: 'Naomi',
      address: 'Rua São José, 90'
    };
  }])
  .directive('myCustomer', function() {
    return {
      restrict: 'A', // elemento, atributo ou classe EAC
      template: `Nome: {{customer.name}} | Endereço: {{customer.address}}`
    };
  })

  angular.bootstrap(document.body, ['myApp']);

})();