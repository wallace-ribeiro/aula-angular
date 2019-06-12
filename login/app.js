(function() {

  angular.module('myApp', [])
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
  .controller('MyController', ['LoginService', '$http', function(LoginService, $http) {
    this.login = () => {
      LoginService.login(this.username, this.senha);
    }
    
    this.getNoticias = () => {
      $http.get('http://104.248.235.252:3003/api/noticias', { headers: {Authorization: localStorage.getItem('token')}}).then((response) => {
             console.log('response: ',response);
      })
    }
    this.getNoticias();
    
  }]);
  
})();  