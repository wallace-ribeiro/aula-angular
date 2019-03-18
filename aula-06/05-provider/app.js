(function() {

  angular.module('myApp', ['ui.bootstrap'])
    .provider('frutaProvider', function() {
      console.log('executando o serviço frutaProvider');//veja no console quantas vezes essa linha aparece
      let factory = function(fruta) {
        console.log(`criando frase para a fruta`);// e essa linha qnts vezes aparece?
        return `Esta fruta é ${fruta}`
      };
      this.$get = [function () {
        return factory;
      }];
    })
    .component('home', {
      bindings: {
        fruta: '@'
      },
      controller: ['frutaProvider', '$log', function(frutaProvider, $log) {
	
	this.$onInit = () => {
            this.frase = frutaProvider(this.fruta);
	};
      }],
      template: `
        <div> 
        <p>Meu Fruta Provider, disponível para toda a aplicação via injeção do serviço frutaProvider</p>
        <p>Fruta: {{$ctrl.frase}} </p>
        </div>
      `
    });
    
})();