(function() {

  angular.module('myApp', ['ngResource'])
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
  .controller('MyController', ['LoginService','NoticiasService', function(LoginService, NoticiasService) {
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
    this.novaNoticia = () => {
      NoticiasService.criarNoticia({titulo: this.titulo, mensagem: this.mensagem, imagem: this.imagem})
      this.getNoticias();
    }
    
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
  
  
})();  
