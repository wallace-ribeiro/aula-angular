(function() {

  angular.module('myApp', [])

	.factory('testInterceptor', function testInterceptor() {
    return {
      request: function(config) {
        console.log('request interceptor', config);
        return config;
      },

      requestError: function(config) {
      	console.log('requestError interceptor', config);
        return config;
      },

      response: function(response) {
      	console.log('response interceptor', response);
        return response;
      },

      responseError: function(response) {
        console.log('responseError interceptor', response);
        return response;
      }
    }
  })
  
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('testInterceptor');
  })

  .component('myComponent', {
    controller: ['$http','$log',MyComponentController],
    template: ` <h1 ng-bind="$ctrl.titulo"></h1>
                <p>{{$ctrl.dados}}</p>
                <button ng-click="$ctrl.buscar()">
                  Nova chamada
                </button>
              `
  });
  
/* ============== ============== ============== ============== ============== ============== */

  angular.module('myAppMock', ['myApp', 'ngMockE2E'])
    .run(['$httpBackend', FalsoServidorRemoto]);

  // Amarra a aplicação angular na tag body do html. Equivale a <body ng-app="myAppMock">.
  angular.bootstrap(document.body, ['myAppMock']);

	// Implementação do servidor remoto mockado
  function FalsoServidorRemoto($httpBackend) {
    var i= 0;
    
    $httpBackend.when('GET',/^.*$/).respond(function(method, url, data, headers) {
    	let status = [200,404,401,503];
      let _dado = status[ (i++)%status.length ];
      console.log('Received these data:', method, url, data, headers);
      return [_dado, {status:_dado}, {}];
    });
  }
  
/* ============== ============== ============== ============== ============== ============== */

	// Implementação da controladora do componente
  function MyComponentController($http, $log) {
    this.$onInit = () => {
    	this.titulo = 'Meu primeiro App Mockado';
      this.dados = {};
    };
    this.buscar = () => {
    	$http.get('/test').then((response)=>{
      	this.dados = response.data;
        this.dados['resolvido-rejeitado']='resolvido';
      }).catch((response)=>{
      	this.dados = response.data;
        this.dados['resolvido-rejeitado']='rejeitado';
      });
    };
  }
})();