(function() {

  angular.module('myApp', [])
    .controller('UserCtrl', ['$scope', function($scope) {
      $scope.users = [{
        details: {
          "username": "Todd",
          "id": "89101111",
          "idade": "15"
        }
      }, {
        details: {
          "username": "Motto",
          "id": "89101113",
          "idade": "25"
        }
      }, {
        details: {
          "username": "Erick",
          "id": "89101114",
          "idade": "35"
        }
      }, {
        details: {
          "username": "Menezes",
          "id": "89101115",
          "idade": "45"
        }
      }, {
        details: {
          "username": "Moreira",
          "id": "89101116",
          "idade": "55"
        }
      }];
    }]);

})();