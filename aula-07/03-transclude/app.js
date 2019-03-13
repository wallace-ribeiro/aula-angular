(function() {

  angular.module('myApp', [])
  .controller('Controller', ['$scope', function($scope) {
  }])
  .directive('customButton', function() {
    return {
      restrict: 'EAC', // elemento, atributo ou classe
      replace: true,
      transclude: true,
      template: `<button href="" class="myawesomebutton">
        <i class="fa fa-cloud"></i>
       <span ng-transclude></span>
         </button>`,
      link: function(scope, element, attrs) {
        // DOM manipulation/events here!
        console.log('scope: ',scope);
	console.log('element: ',element);
	console.log('attrs: ',attrs);
      }
    };
  })

  angular.bootstrap(document.body, ['myApp']);

})();