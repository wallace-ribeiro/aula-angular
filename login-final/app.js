(function() {

  angular.module('myApp', ['ngResource', 'ui.router'])
  .factory('Interceptor', function Interceptor() {
    return {
      request: function(config) {
         config.headers.Authorization = localStorage.getItem('token');
        return config;
      },
      requestError: function(config) {
        return config;
      },
      response: function(response) {
        return response;
      },
      responseError: function(response) {
        console.log('responseError interceptor', response);
        if(response.status == 401) {
          alert("Nao Autorizado!")
        }
        return response;
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('Interceptor');
  })
  .config(($stateProvider, $urlRouterProvider) => {
         $urlRouterProvider.otherwise('/');
         $stateProvider
         .state({
            name: 'home',
            url: '/',
            templateUrl: 'home/home.html'
          })
          .state('noticia', {
              url: '/noticia',
              template: '<ui-view></ui-view>',
           })
          .state('noticia.edit', {
              url: '/:id',
              templateUrl: 'noticia/edicao.html',
           });
  });
  
})();  
