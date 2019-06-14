(function() {

  angular.module('myApp')
  .controller('HomeController', ['LoginService','NoticiasService', '$state', function(LoginService, NoticiasService, $state) {
    this.login = () => {
      LoginService.login(this.username, this.senha);
    }
    this.noticias = []
    this.getNoticias = () => {
      NoticiasService.getNoticias().then((response) => {
          this.noticias = response;
      })
    }
    this.getNoticias();
    this.novaNoticia = (event) => {
      NoticiasService.criarNoticia({titulo: event.titulo, mensagem: event.mensagem, imagem: event.imagem}).then(() => this.getNoticias() )
    }

    this.editar = function(id) {
            console.log('editar: ',id)
            $state.go("noticia.edit", {id: id})
    }

    this.deletar = function(noticia) {
        NoticiasService.deletarNoticia(noticia).then(() => this.getNoticias());
    }

    this.nomeBtn = "Nova noticia"
    this.editarBtn = "Salvar"
    
  }])
  
})();  
