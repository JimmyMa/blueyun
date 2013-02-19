define([
  'jquery',
  'underscore',
  'backbone',
  'models/gallery/CategoryModel',
  'text!templates/gallery/newCategoryTemplate.html'
], function($, _, Backbone, CategoryModel, newCategoryTemplate){
  
  var NewCategoryView = Backbone.View.extend({
   
    events: {
      "click #addCategory":  "addCategory",
    },
    
    initialize : function() {
    },

    render : function() {
   
        var that = this;

		var data = {
		};

        var compiledTemplate = _.template( newCategoryTemplate, data );
        that.$el.html( compiledTemplate ); 

        return this;
      },
      
     addCategory : function() {
 		this.category = this.options.category;
        var title = this.$( "#catTitle" ).val();
        var des = this.$( "#catDes" ).val();
     	var categoryModel = new CategoryModel( {title: title, description: des, parentid: this.category.id }, {action: 'save'} );
     	categoryModel.save(null, {success : function(category) {
	        require( ['views/gallery/ImageUploadView'], function(ImageUploadView) {
		      	var imageUploadView = new ImageUploadView({category: category.toJSON()});
		      	imageUploadView.render();
		      	});
     	}});
     }


  });

  return NewCategoryView;

});
