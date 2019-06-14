(function() {

  angular.module('myApp')
  .component('noticia', {
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
  })

  function ComponentController($log, $window, $timeout) {
    this.executar = function() {
       this.onChange({event: {titulo: this.titulo , mensagem: this.mensagem, imagem: this.imagem} });
    };
  }
  
  
})();  
