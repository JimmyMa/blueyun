define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/gallery/imageUploadTemplate.html',
  'jquery.fileupload', 'fileupload-ui'
], function($, _, Backbone, imageUploadTemplate){
  
  var ImageUploadView = Backbone.View.extend({
    el : $("#gallerymain"),
    
    initialize : function() {
    },

    render : function() {
   
        var that = this;
		this.category = this.options.category;
		var data = {
			category: this.category

		};

        var compiledTemplate = _.template( imageUploadTemplate, data );
        $("#gallerymain").html( compiledTemplate ); 
        
	    // Initialize the jQuery File Upload widget:
	    $('#fileupload').fileupload({
	        // Uncomment the following to send cross-domain cookies:
	        //xhrFields: {withCredentials: true},
	        url: '/gallery/img/' + this.category.id
	    });
	
	    // Enable iframe cross-domain access via redirect option:
	    $('#fileupload').fileupload(
	        'option',
	        'redirect',
	        window.location.href.replace(
	            /\/[^\/]*$/,
	            '/cors/result.html?%s'
	        )
	    );


        return this;
      }


  });

  return ImageUploadView;

});
