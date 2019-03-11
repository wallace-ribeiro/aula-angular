(function() {

  ComponentController.$inject = ['$log', '$window', '$timeout'];
  
  angular.module('myApp', ['ui.bootstrap'])
    .controller('myController', function() {
      this.id = 5;
      this.nome = 'josé';
      this.change = (event) => { 
	console.log('Mudando o pai');
	this.id = event.id
	this.nome = event.nome
      };
    })
    .component('perfilUsuario', {
    	bindings: {
        userId: '<id',
        nome: '<',
	onChange: '&'
      },
      controller: ComponentController,
      template: `<div>
          <p> ID Componente Filho: </p>
          <p> {{$ctrl.userId}} - {{$ctrl.nome}} </p>
          <button ng-click="$ctrl.mudarPai()">Mudar Pai</button>
      </div>`
    });


  function ComponentController($log, $window, $timeout) {
      this.mudarPai = function() {
	this.onChange({event: {id: this.userId , nome: this.nome} });
      };
      $timeout(() => {
          this.userId = 10;
          this.nome = 'Erick';
       }, 5000); // após 5s altera os dados.
  }

})();