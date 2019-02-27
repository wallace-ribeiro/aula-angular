(function() {

  ComponentController.$inject = ['$log', '$window', '$timeout'];
  
  angular.module('myApp', ['ui.bootstrap'])
    .controller('myController', function() {
      this.id = 5;
      this.nome = 'josé';
    })
    .component('perfilUsuario', {
    	bindings: {
        userId: '=id',
        nome: '<'
      },
      controller: ComponentController,
      template: `<div>
          <p> ID Componente Filho: </p>
          <p> {{$ctrl.userId}} - {{$ctrl.nome}} </p>
          <p> {{$ctrl.objeto}}</p>
      </div>`
    });


  function ComponentController($log, $window, $timeout) {
      $timeout(() => {
          this.userId = 10;
          this.nome = 'Erick';
       }, 5000); // após 5s altera os dados.
  }

})();