(function() {

  angular.module('myApp', [])
  .controller('Controller', ['$scope', function($scope) {
    $scope.customer = {
      name: 'Naomi',
      address: 'Rua S�o Jos�, 90'
    };
  }])
  .directive('myCustomer', function() {
    return {
      template: `Nome: {{customer.name}} | Endere�o: {{customer.address}}`
    };
  })

  angular.bootstrap(document.body, ['myApp']);

})();