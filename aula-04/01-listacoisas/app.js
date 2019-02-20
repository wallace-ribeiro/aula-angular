(function() {

  angular.module('myApp', [])
    .controller('UserCtrl', ['$scope','$http', function($scope, $http) {
      $http({
          method: 'GET',
          url: 'http://104.248.235.252:3000/coisas/01'
         }).then((response) => {
             $scope.coisas = response.data;
      })
      .catch((error) => {
         console.log('Error: ',error);
      });
      
    }]);

})();