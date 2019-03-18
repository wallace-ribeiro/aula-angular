(function() {
  
  angular.module('myApp', ['ui.bootstrap'])
    .value('fruta', 'Abacate')  
    .factory('frutaFactory', ['fruta', function(f) {
      console.log('chamando frutaFactory');
      return `Esta fruta é ${f}`;
    }])
    
    .component('home', {
      controller: ['frutaFactory', '$log', function(factory, $log) {
        this.fruta = factory;
      }],
      template: `
        <div> 
        <p>Fruta: {{$ctrl.fruta}} </p>
        </div>
      `
    });
    
})();
