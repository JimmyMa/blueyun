define([
  'underscore',
  'backbone',
  'models/gallery/ImageModel'
], function(_, Backbone, ImageModel){

  var ImageCollection = Backbone.Collection.extend({
      
      model: ImageModel,

      initialize : function(models, options) {
      	  this.action = options.action;
      },
      
      url : function() {
      	  if ( this.action == "getPopImags" ) {
              return '/home/popimgs';
          } else {
          
          }
      },
    
      parse : function(data) {
          return data;
      }
      

     
  });

  return ImageCollection;

});