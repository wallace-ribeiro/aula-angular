 
(function() {

  angular.module('myApp', ['ui.bootstrap'])
    .controller('myController', ['$log', '$window', '$timeout', function($log, $window, $timeout) {
      this.titulo = 'Testando Containers';
      this.containerType = 'container';
    }]);

})();