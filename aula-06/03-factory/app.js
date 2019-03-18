(function() {

  angular.module('myApp', ['ui.bootstrap'])
    .factory('frutaFactory', [ function() {
      console.log('executando o serviço frutaFactory');//veja no console quantas vezes essa linha aparece
      let factory = function(fruta) {
        console.log(`criando frase para a fruta`);// e essa linha qnts vezes aparece?
        return `Esta fruta é ${fruta}`
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
        <p>Meu Fruta Factory, disponível para toda a aplicação via injeção do serviço frutaFactory</p>
        <p>Fruta: {{$ctrl.frase}} </p>
        </div>
      `
    });
    
})();