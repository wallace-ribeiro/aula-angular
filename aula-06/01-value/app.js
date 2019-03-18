(function() {

  angular.module('myApp', ['ui.bootstrap'])
  
    .value('texto', {
      'primeiroTexto': 'olá mundo',
      'outroTexto': 'adeus mundo'
    })
    
    .component('home', {
      controller: ['texto', function(text, $log) {
	
        this.p1 = text.primeiroTexto;
        this.p2 = text.outroTexto;
      }],
      template: `
        <div> 
        <p>{{$ctrl.p1}}</p>
        <p>{{$ctrl.p2}}</p>
        </div>
      `
    });
    
})();