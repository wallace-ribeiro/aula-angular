(function() {

  angular.module('myApp', [])
    .controller('UserCtrl', ['$scope','$http', function($scope, $http) {
      $http({
          method: 'GET',
          url: 'http://localhost:3000/coisas'
         }).then((response) => {
             $scope.coisas = response.data;
      })
      .catch((error) => {
         console.log('Error: ',error);
      });
      
    }]);

})();