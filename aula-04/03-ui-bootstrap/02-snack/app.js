(function() {

  angular.module('myApp', ['ui.bootstrap'])
    .controller('myController', ['$log', '$window', '$timeout', function($log, $window, $timeout) {
      this.titulo = 'Meu primeiro App com SnackAlert';
      this.dicaBotao = 'Me aperte para ver o alerta';

      let types = ['success', 'info', 'warning', 'danger'];
      let i = 0;
      this.alert = {
        msg: 'OOPS: Snackbar alert test !!!!!!!!',
        type: types[i]
      };

      this.showSnackAlert = (alert) => { //pode ser enviado um parâmetro ou não
        if(alert)
          this.alert = alert;
        this.snackAlertClass = ['show', `alert-${this.alert.type}`];
        $timeout(() => {
          this.snackAlertClass = false;
          i = (++i)%4;
          this.alert.type = types[i];
        }, 3000);
      };
    }]);

})();

