(function() {

  angular.module('myApp', ['ui.bootstrap'])
    .service('LancadorSubmarino',[function SubmarineLauncher() {
      this.launchedCount = 0;
      this.launch = () => {
        this.launchedCount++;        
      };
      this.getNrLancamentos = () => this.launchedCount;
    }])
    
    .component('home', {
      bindings: {
        tipo: '@',
	intervalo: '@'
      },
      controller: ['LancadorSubmarino','$interval', function(lancador, $interval) {
	this.$onInit = () => {
          $interval(()=>{
            lancador.launch();
            this.numeroLancamentos = lancador.getNrLancamentos();
          }, Number(this.intervalo));
	};
      }],
      template: `
        <div> 
        <p>Meu Lançador de submarinos, disponível para toda a aplicação via injeção do serviço LancadorSubmarino. Dois componentes home estão disparando os lançamentos mesmo serviço.</p>
        <p>O numero total de torpedos lançados por todos os submarinos: {{$ctrl.numeroLancamentos }}. Submario da classe {{$ctrl.tipo}}</p>
        </div>
      `
    });
    
})();
