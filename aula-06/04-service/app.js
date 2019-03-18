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
        <p>Meu Lan�ador de submarinos, dispon�vel para toda a aplica��o via inje��o do servi�o LancadorSubmarino. Dois componentes home est�o disparando os lan�amentos mesmo servi�o.</p>
        <p>O numero total de torpedos lan�ados por todos os submarinos: {{$ctrl.numeroLancamentos }}. Submario da classe {{$ctrl.tipo}}</p>
        </div>
      `
    });
    
})();
