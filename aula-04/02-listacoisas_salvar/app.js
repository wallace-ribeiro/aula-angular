(function() {

  angular.module('myApp', [])
    .controller('UserCtrl', ['$scope','$http', function($scope, $http) {
      const id = '01';
      $scope.adicionar = function() {
	if(!$scope.coisas)
	  $scope.coisas = [];
	$scope.coisas.push($scope.item);
      };
      $scope.salvar = function() {
	if(!$scope.coisas)
	  $scope.coisas = [];
	
	$http.post('http://104.248.235.252:3000/coisas',{id: id, coisas: $scope.coisas}).then((response) => {
             console.log('Response: ', response.data);
         })
         .catch((error) => {
           console.log('Error: ',error);
         });
      };
      $http.get('http://104.248.235.252:3000/coisas/'+id).then((response) => {
             $scope.coisas = response.data;
      })
      .catch((error) => {
         console.log('Error: ',error);
      });
      
    }]);

})();