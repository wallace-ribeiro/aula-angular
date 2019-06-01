(function() {

  angular.module('myApp', ['ngResource', 'ui.router'])
  .service('LoginService', ['$http', function($http) {
    
    this.login = (login, senha) => {
      return $http.post('http://104.248.235.252:3003/api/login',{login: login, senha: senha}).then((response) => {
        console.log('Response: ', response);
	      if(response.status == 200) {
	        localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', login)
	        return true;
	      }
	      return false;
     })
     .catch((error) => {
       console.log('Error: ',error);
     });
    };
    
    this.logout = () => {
      localStorage.setItem('token', '');
    }
  }])
  .service('NoticiasService', ['$resource', function($resource) {
    let Resource = $resource('http://104.248.235.252:3003/api/noticias/:id',
                             {id:'@id'},
          {update:{method:'PUT'}});

    this.getNoticias = () => {
      return Resource.query().$promise
    };

    this.getNoticiaById = (id) => {
      return Resource.query().$promise.then((noticias)=> {
         return noticias.find((noticia) => noticia.id == id);
      })
    };

    this.criarNoticia = (noticia) => {
      let newNoticia = new Resource()
      newNoticia.titulo = noticia.titulo
      newNoticia.mensagem = noticia.mensagem
      newNoticia.imagem = noticia.imagem
      newNoticia.data = new Date()
      return newNoticia.$save()
    };

    this.atualizarNoticia = (noticia) => {
      noticia.$update()
    }

    this.deletarNoticia = (noticia) =>{
      noticia.$delete()
    }
  }])
  .controller('EditController', ['NoticiasService', '$state','$stateParams', function(NoticiasService, $state, $stateParams) {
   
     console.log('$stateParams: ',$stateParams.id)
     NoticiasService.getNoticiaById($stateParams.id).then((noticia) => {
      console.log('Noticia: ',noticia);
      this.noticia = noticia || null;
     })
     this.nomeBotao = "Salvar";
     this.salvarNoticia = (event) => {
      this.noticia.titulo = event.titulo;
      this.noticia.mensagem = event.mensagem;
      this.noticia.imagem = event.imagem;
      NoticiasService.atualizarNoticia(this.noticia);
      $state.go("home");
     }
   }])
  .controller('MyController', ['LoginService','NoticiasService', '$state', function(LoginService, NoticiasService, $state) {
    this.login = () => {
      LoginService.login(this.username, this.senha);
    }
    this.noticias = []
    this.getNoticias = () => {
      NoticiasService.getNoticias().then((response) => {
          this.noticias = response;
      })
    }
    this.getNoticias();
    this.novaNoticia = (event) => {
      NoticiasService.criarNoticia({titulo: event.titulo, mensagem: event.mensagem, imagem: event.imagem})
      this.getNoticias();
    }

    this.editar = function(id) {
      console.log('editar: ',id)
            $state.go("noticia.edit", {id: id})
        }

    /* O codigo acima é:
      this.salvarNoticia = function(noticia) {
        return function(event) {
          noticia.titulo = event.titulo;
          noticia.mensagem = event.mensagem;
          noticia.imagem = event.imagem;
          NoticiasService.atualizarNoticia(noticia);
        }
    }
    */

    this.nomeBtn = "Nova noticia"
    this.editarBtn = "Salvar"
    
  }])
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
  .component('manipularNoticia', {
    bindings: {
      titulo: '<',
      mensagem: '<',
      imagem: '<',
      nomeBtn:'<',
      onChange: '&'
    },
    controller: ComponentController,
    template: `<div>
    <div><label>Titulo:</label><input type="text" ng-model="$ctrl.titulo"></div>
    <div><label>Mensagem:</label><input type="text" ng-model="$ctrl.mensagem"></div>
    <div><label>Imagem:</label><input type="text" ng-model="$ctrl.imagem"></div>
    <div><button ng-click="$ctrl.executar()">{{$ctrl.nomeBtn}}</button></div>
    </div>`
  }).config(($stateProvider, $urlRouterProvider) => {
         $urlRouterProvider.otherwise('/');
         $stateProvider
         .state({
            name: 'home',
            url: '/',
            templateUrl: 'home.html'
          })
          .state('noticia', {
              url: '/noticia',
              template: '<ui-view></ui-view>',
           })
          .state('noticia.edit', {
              url: '/:id',
              templateUrl: 'edicao.html',
           });
  });

  function ComponentController($log, $window, $timeout) {
    this.executar = function() {
       this.onChange({event: {titulo: this.titulo , mensagem: this.mensagem, imagem: this.imagem} });
    };
  }
  
  
})();  
