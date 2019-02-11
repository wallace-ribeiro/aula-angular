(function() {

  angular.module('myApp', [])
    .controller('UserCtrl', ['$scope', function($scope) {
      this.Date = Date;
    }]);

})();