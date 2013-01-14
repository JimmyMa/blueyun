define([
  'underscore',
  'backbone',
  'models/gallery/CategoryModel'
], function(_, Backbone, CategoryModel){

  var CategoryCollection = Backbone.Collection.extend({
      
      initialize : function(models, options) {},
      
      url : function() {
        if ( this.userId != null ) {
        	return "/" + this.userId + '/gallery/cats/' + this.catId;
        } else {
        	return '/gallery/cats/' + this.catId;
        }
      },
    
      parse : function(data) {
          return data;
      }
      

     
  });

  return CategoryCollection;

});