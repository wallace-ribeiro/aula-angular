(function() {

  angular.module('myApp')
  .service('LoginService', ['$http', '$state', function($http, $state) {
    
    this.login = (login, senha) => {
      $http.post('http://104.248.235.252:3003/api/login',{login: login, senha: senha}).then((response) => {
         console.log('Response: ', response.data);
	 localStorage.setItem('token', response.data.token);
	 $state.go('home')
      })
      .catch((error) => {
        console.log('Error: ',error);
      });
    };
    
    this.logout = () => {
      localStorage.setItem('token', '');
    }
  }])
  
})(); 
