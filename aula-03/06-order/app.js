(function() {

  angular.module('myApp', [])
    .controller('UserCtrl', ['$scope', function($scope) {
      this.names = ['John', 'Mary', 'Mike', 'Adam', 'Julie', 'Juliette'];
      this.nrs = [ 43, 5, 63, 23, 4, 0, 9];
      this.friends = [
        {name:'John', phone:'555-1276'},
        {name:'Mary', phone:'800-BIG-MARY'},
        {name:'Mike', phone:'555-4321'},
        {name:'Adam', phone:'555-5678', conjuge: {name:'Juliette', phone:'555-5678'}},
        {name:'Julie', phone:'555-8765'},
        {name:'Juliette', phone:'555-5678', conjuge: {name:'Adam', phone:'555-5678'}},
      ];
    }]);

})();