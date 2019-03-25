(function() {

  angular.module('myApp')
  .service('NoticiasService', ['$resource', function($resource) {
    let Resource = $resource('http://104.248.235.252:3003/api/noticias/:id',
                             {id:'@id'},
			    {update:{method:'PUT'}});
    this.noticias = Resource.query();
    this.getNoticias = () => {
      return this.noticias;
    };
  }])
})(); 
