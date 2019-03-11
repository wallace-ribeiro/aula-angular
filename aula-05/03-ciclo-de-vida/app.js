(function() {

  ComponentController.$inject = ['$log', '$window', '$timeout'];
  
  angular.module('myApp', ['ui.bootstrap'])
    .controller('myController', function() {
      this.mostrar = true;
      this.id = 5;
      this.nome = 'josé';
      this.mudar = function () {
	this.mostrar = !this.mostrar
      };
    })
    .component('perfilUsuario', {
    	bindings: {
        userId: '<id',
        nome: '<'
      },
      controller: ComponentController,
      template: `<div>
          <p> ID Componente Filho: </p>
          <p> {{$ctrl.userId}} - {{$ctrl.nome}} </p>
      </div>`
    });


  function ComponentController($log, $window, $timeout) {
      this.$onInit = () => {
        console.log('Inicio do componente');
      }; 
      this.$onChanges = (changesObj) => {
        console.log('Mudou o componente: ',changesObj);
      };
      this.$onDestroy = () => {
        console.log('Fim do componente');
      };
  }

})();