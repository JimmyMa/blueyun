define([
  'underscore',
  'backbone',
  'models/gallery/ImageModel'
], function(_, Backbone, ImageModel){

  var ImageCollection = Backbone.Collection.extend({
      
      model: ImageModel,

      initialize : function(models, options) {},
      
      url : function() {
        return '/images/subcat/' + this.subcatId;
      },
    
      parse : function(data) {
          return data;
      }
      

     
  });

  return ImageCollection;

});