(function() {

  angular.module('myApp', ['ngResource'])

  .service('MyService', ['$resource', '$q', '$log', function($resource, $q, $log) {
    let Resource = $resource('/api/:verbo/:itemId',
                             {verbo:'usuarios', itemId:'@id'},
                             {update:{method:'PUT'}});

    this.getUsuarios = () => {
      return Resource.query();
    };
    this.adicionarUsuario = (usuario) => {
      let newUser = new Resource();
      newUser.nome = usuario.nome;
      newUser.$save();
      return newUser;
    };
    this.atualizarUsuario = (usuario) => {
      usuario.$save();
    };
    this.deletar = (usuario) => {
    	if(usuario)
        return usuario.$delete();//retorna uma promessa
      else
      	return Resource.delete();//retorna um objeto da classe
    }
  }])

  .component('myComponent', {
    controller: ['$http', '$window', '$log', 'MyService', MyComponentController],
    template: ` <h1 ng-bind="$ctrl.titulo"></h1>
                  <div class="my-block">
                    <h3>Usuários</h3>
                    <p ng-repeat="usuario in $ctrl.usuarios" 
                    	 ng-click="$ctrl.onUserClicked(usuario)">
                    	{{usuario.nome}}
                    </p>
                  </div>
                  <div class="my-block">
                    <h3>Adicionar Usuário</h3>
                    <input type="text" ng-model="$ctrl.usuario.nome">
                    <button ng-click="$ctrl.onButtonClicked()">
                    	{{$ctrl.editando ? 'Atualizar' : 'Adicionar'}}
										</button>
                    <button ng-click="$ctrl.onDeleteButtonClicked()">
                    	{{$ctrl.editando ? 'Deletar' : 'Deletar Tudo'}}
                    </button>
                  </div>`
  });
/* ============== ============== ============== ============== ============== ============== */
  angular.module('myAppMock', ['myApp', 'ngMockE2E'])
    .run(['$httpBackend', FalsoServidorRemoto]);

  // Amarra a aplicação angular na tag body do html. Equivale a <body ng-app="myAppMock">.
  //angular.bootstrap(document.body, ['myAppMock']);

	// Implementação do servidor remoto mockado
  function FalsoServidorRemoto($httpBackend) {
    let nextId = 4;
    let usuarios = [
      {id:1,nome:'Erick'}, 
      {id:2,nome:'Menezes'}, 
      {id:3,nome:'Moreira'}
    ];

    $httpBackend.whenGET('/api/usuarios').respond(function(method, url, data, headers) {
      console.log('Received these data:', method, url, data, headers);
      return [200, usuarios, {}];
    });

    $httpBackend.whenPOST(/^\/api\/usuarios.*$/).respond(function(method, url, data, headers) {
      console.log('Received these data:', method, url, data, headers);
      let _data = angular.fromJson(data);
      let id = url.substring(14);
      let user = { id: (id ? id : nextId++), nome: _data.nome };
      if (url === '/api/usuarios') // cria novo usuario
      	usuarios.push(user);
      else { //atualiza um usuario
        for(let i=0; i<usuarios.length; i++) {
          if(usuarios[i].id == id){
            usuarios[i] = user;
            console.log(usuarios);
            break;
          }
        }
      }
      return [200, user, {}];
    });

    $httpBackend.whenDELETE(/^\/api\/usuarios.*$/).respond(function(method, url, data, headers) {
      console.log('Received these data:', method, url, data, headers);
      if (url === '/api/usuarios')
        usuarios = [];
      else {
        let id = url.substring(14);
        for(let i=0; i<usuarios.length; i++) {
          if(usuarios[i].id == id){
            usuarios.splice(i,1);
            break;
          }
        }
      }
      return [200, {}, {}];
    });
    
    $httpBackend.when(/^.*$/).respond(function(method, url, data, headers) {
      console.log('Received these data:', method, url, data, headers);
      return [200, {}, {}];
    });
  }
/* ============== ============== ============== ============== ============== ============== */
	// Implementação da controladora do componente
  function MyComponentController($http, $window, $log, myService) {
    
    this.getUsuarios = () => {
     this.usuarios = myService.getUsuarios();
    };
    this.onUserClicked = (usuario) => {
      this.usuario = usuario;
      this.editando = true;
      //this.indexUsuarioEditado = this.usuarios.indexOf(usuario);
      //this.usuarioAntigo = this.usuarios[this.indexUsuarioEditado];
    };
    this.onButtonClicked = () => {
      if (this.editando) {
        myService.atualizarUsuario(this.usuario);
      } else {
      	let newUser = myService.adicionarUsuario(this.usuario);
        this.usuarios.push(newUser);
      }
      delete this.usuario;
      this.editando = false;
    };
    this.onDeleteButtonClicked = () => {
      let p = myService.deletar(this.usuario);
      console.log('onDeleteButtonClicked',p);
      if(this.usuario) {
      	p.then((r) => delete this.usuario)
      } else {
      	this.usuarios = p;
      }
      this.editando = false;
    };
    this.$onInit = () => {
    	this.titulo = 'Meu primeiro App Mockado';
      this.editando = false;
    	this.getUsuarios();
    };
  }
})();
