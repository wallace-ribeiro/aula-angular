(function() {

  angular.module('myApp', ['ui.bootstrap'])
    .controller('myController', ['$log', '$window', '$timeout', function($log, $window, $timeout) {
      this.titulo = 'Meu primeiro App com uib-tab';

      this.tabs = [
        {title: 'tab1', content: 'bla bla bla bla'},
        {title: 'tab2', content: 'bl3 bl3 bl3 bl3'},
      ];

      this.alertMe = function(){
        let alert = 'Preencha um nome no Form Tab';
        if(this.name)
          alert = this.name;
        $window.alert(alert);
      };
    }]);

})();