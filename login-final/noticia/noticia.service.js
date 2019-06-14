(function() {

  angular.module('myApp')
  .service('NoticiasService', ['$resource', function($resource) {
    let Resource = $resource('http://104.248.235.252:3003/api/noticias/:id',
                             {id:'@id'},
          {update:{method:'PUT'}});

    this.getNoticias = () => {
      return Resource.query().$promise
    };

    this.getNoticiaById = (id) => {
      return Resource.query().$promise.then((noticias)=> {
         return noticias.find((noticia) => noticia.id == id);
      })
    };

    this.criarNoticia = (noticia) => {
      let newNoticia = new Resource()
      newNoticia.titulo = noticia.titulo
      newNoticia.mensagem = noticia.mensagem
      newNoticia.imagem = noticia.imagem
      newNoticia.data = new Date()
      return newNoticia.$save()
    };

    this.atualizarNoticia = (noticia) => {
      return noticia.$update()
    }

    this.deletarNoticia = (noticia) =>{
      return noticia.$delete()
    }
  }])
  
})();  
