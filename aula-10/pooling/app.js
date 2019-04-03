(function() { 
  var myApp = angular.module('ChatApp', []);


myApp.controller('ChatController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {

    
    $scope.msgs = []
    
    
    $scope.getMsgs = function () {
      return $scope.msgs;
    }
    
    $scope.emitMsg = function() {
        $http.post('http://104.248.235.252:3005/api/mensagens/',{msg: {msg: $scope.msg, name: $scope.name}}).then((response) => {
             console.log('Response: ', response.data);
         })
    };
    
    $http.get('http://104.248.235.252:3005/api/mensagens/'+1000).then((response) => {
             $scope.msgs = response.data;
      })
    $interval(function() {
      $http.get('http://104.248.235.252:3005/api/mensagens/since/'+($scope.msgs.length > 0 ? $scope.msgs[$scope.msgs.length -1].id : 0)).then((response) => {
             let newMsgs = response.data;
             newMsgs.forEach((msg) => $scope.msgs.push(msg));
      })
    }, 1000)
    
}]);
})();
