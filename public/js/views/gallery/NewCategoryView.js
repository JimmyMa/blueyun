define([
  'jquery',
  'underscore',
  'backbone',
  'models/gallery/CategoryModel',
  'views/gallery/ImageUploadView',
  'text!templates/gallery/newCategoryTemplate.html'
], function($, _, Backbone, CategoryModel, ImageUploadView, newCategoryTemplate){
  
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
	      	var imageUploadView = new ImageUploadView({category: category.toJSON()});
	      	imageUploadView.render();
     	}});
     }


  });

  return NewCategoryView;

});
