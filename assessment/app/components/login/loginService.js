(function() {

  angular.module('myApp')
  .service('LoginService', ['$http', function($http, $state) {
    
    this.login = (login, senha) => {
      return $http.post('http://104.248.235.252:3003/api/login',{login: login, senha: senha}).then((response) => {
         console.log('Response: ', response);
	 if(response.status == 200) {
	   localStorage.setItem('token', response.data.token);
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
  
})(); 
