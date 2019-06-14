(function() {

  angular.module('myApp')
  .controller('EditController', ['NoticiasService', '$state','$stateParams', function(NoticiasService, $state, $stateParams) {
   
     console.log('$stateParams: ',$stateParams.id)
     NoticiasService.getNoticiaById($stateParams.id).then((noticia) => {
      console.log('Noticia: ',noticia);
      this.noticia = noticia || null;
     })
     this.nomeBotao = "Salvar";
     this.salvarNoticia = (event) => {
      this.noticia.titulo = event.titulo;
      this.noticia.mensagem = event.mensagem;
      this.noticia.imagem = event.imagem;
      NoticiasService.atualizarNoticia(this.noticia);
      $state.go("home");
     }
   }])
  
  
})();  
