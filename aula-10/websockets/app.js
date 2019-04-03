(function() { 
  var myApp = angular.module('ChatApp', []);


myApp.controller('ChatController', ['$scope', '$http', function($scope, $http) {

    var socket = io.connect('http://104.248.235.252:3008');
    console.log('socket: ',socket);
    
    $scope.msgs = []
    
    socket.on('msg', function(msg){
      console.log('msg: ', msg);
       $scope.msgs.push(msg);
       //$scope.msgs = [];
       console.log(' $scope.msgs: ', $scope.msgs);
       $scope.$apply();
    });
    
    $scope.getMsgs = function () {
      return $scope.msgs;
    }
    
    $scope.emitMsg = function() {
        socket.emit('msg', {msg: $scope.msg, name: $scope.name});
    };
    
    $http.get('http://104.248.235.252:3005/api/mensagens/'+1000).then((response) => {
             $scope.msgs = response.data;
      })
}]);
})();
