(function() {

  angular.module('myApp', ['ui.bootstrap'])
    .factory('frutaFactory', [ function() {
      console.log('executando o servi�o frutaFactory');//veja no console quantas vezes essa linha aparece
      let factory = function(fruta) {
        console.log(`criando frase para a fruta`);// e essa linha qnts vezes aparece?
        return `Esta fruta � ${fruta}`
      };
      return factory;
    }])
    .component('home', {
      bindings: {
        fruta: '@'
      },
      controller: ['frutaFactory', '$log', function(frutaFactory, $log) {
	this.$onInit = () => {
            this.frase = frutaFactory(this.fruta);
	};
      }],
      template: `
        <div> 
        <p>Meu Fruta Factory, dispon�vel para toda a aplica��o via inje��o do servi�o frutaFactory</p>
        <p>Fruta: {{$ctrl.frase}} </p>
        </div>
      `
    });
    
})();