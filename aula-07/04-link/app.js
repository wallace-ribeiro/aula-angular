(function() {

  angular.module('myApp', [])
  .controller('Controller', ['$scope', function($scope) {
  }])
  .directive('meuBlocoArrastavel', ['$document', function($document) {
    return {
      link: function(scope, element, attr) {
        var startX = 0,
        startY = 0,
        x = 0,
        y = 0;

        element.css({
          position: 'relative',
          border: '1px solid red',
          backgroundColor: 'lightgrey',
          cursor: 'pointer'
        });

        element.on('mousedown', function onMouseDown(event) {
          // Prevent default dragging of selected content
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', onMouseMove);
          $document.on('mouseup', onMouseUp);
        });

        function onMouseMove(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;
          element.css({
            top: y + 'px',
            left: x + 'px'
          });
        }

        function onMouseUp() {
          $document.off('mousemove', onMouseMove);
          $document.off('mouseup', onMouseUp);
        }
      }
    };
  }]);

  angular.bootstrap(document.body, ['myApp']);

})();