(function() {

  
    angular.module('myApp', ['ui.router', 'ui.bootstrap'])
    .controller('retanguloController', ['$scope', 'geometService', function($scope, geometService) {
      $scope.atualizar = function() {
	$scope.area = geometService.getAreaQuadrado($scope.lado1 , $scope.lado2);
      }
    }])
    .controller('trianguloController', ['$scope', 'geometService', function($scope, geometService) {
      $scope.atualizar = function() {
	$scope.area = geometService.getAreaTriangulo($scope.altura , $scope.largura);
      }
     }])
     .controller('circuloController', ['$scope', 'geometService', function($scope, geometService) {
      $scope.atualizar = function() {
	$scope.area = geometService.getAreaCirculo($scope.raio);
      }
     }])
    .controller('casaController', ['geometService', '$scope', function(geometService, $scope) {
      $scope.atualizar = function() {
	$scope.area = geometService.getAreaQuadrado($scope.lado1 , $scope.lado2) + geometService.getAreaTriangulo($scope.altura - $scope.lado1, $scope.lado2);
      }
     }])
    .controller('figuraCompostaController', ['$scope', 'geometService', function($scope, geometService) {
      $scope.atualizar = function() {
	$scope.area = geometService.getAreaQuadrado($scope.lado1 , $scope.lado2) - geometService.getAreaCirculo($scope.raio);
      }
     }])
     .config(($stateProvider, $urlRouterProvider) => {
         $urlRouterProvider.otherwise('/');
         $stateProvider
         .state({
            name: 'home',
            url: '/',
            template: '<h3>Escolha uma figura</h3>'
          })
          .state('retangulo', {
              url: '/retangulo',
              templateUrl: 'retangulo.html',
           })
           .state('triangulo', {
               url: '/triangulo',
               templateUrl: 'triangulo.html'
            }).state('circulo', {
               url: '/circulo',
               templateUrl: 'circulo.html'
            });
     });

  class geometriaService {
    constructor() {
    }

    getAreaQuadrado(lado1, lado2) {
      return lado1 * lado2;
    }
    
    getAreaTriangulo(altura, largura) {
      return (altura * largura)/2
    }
    
    getAreaCirculo(raio) {
      return 3.14 * raio * raio;
    }
  }

  angular.module('myApp')
    .service('geometService', [ geometriaService]);
})();
//http://embed.plnkr.co/