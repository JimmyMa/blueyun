define([
  'jquery',
  'underscore',
  'backbone',
  'collections/gallery/CategoryCollection',
  'views/gallery/ImageUploadView',
  'views/gallery/NewCategoryView',
  'text!templates/gallery/galleryMainTemplate.html',
  'text!templates/gallery/galleryHomeTemplate.html',
  'image-gallery',
  'bootstrap-editable'
], function($, _, Backbone, CategoryCollection, ImageUploadView, 
    NewCategoryView, galleryMainTemplate, galleryHomeTemplate){
  
  var GalleryMainView = Backbone.View.extend({
    el : $("#page"),
    events: {
    	"click #addImgs":  "addImgs",
    	"click #addCat": "addCat"
    },
    
    initialize : function() {
      var that = this;
      var onDataHandler = function(collection) {
          that.render();
      }
	  that.categoryCollection = new CategoryCollection(); 
	  that.categoryCollection.catId = this.options.catId;
	  that.categoryCollection.userId = this.options.userId;
	  that.categoryCollection.fetch({ success : onDataHandler });
    },

    render : function() {
   
        var that = this;
        
        $('#main-menu-left li').removeClass('active');
        $('#main-menu-left li a[href="#/gallery"]').parent().addClass('active');
        this.currentCat = that.categoryCollection.models[3].toJSON();
        var data = {
        	categories: that.categoryCollection.models[0].toJSON(),
        	images: that.categoryCollection.models[1].toJSON(),
        	catParents : that.categoryCollection.models[2].toJSON(),
        	currentCat : this.currentCat,
        	needDivider : this.currentCat.id != undefined,
        	mainPage : this.options.userId == undefined,
        	_: _
        }
		var compiledTemplate;
		if ( this.options.userId == undefined ) {
			compiledTemplate = _.template( galleryHomeTemplate, data );
		} else {
			compiledTemplate = _.template( galleryMainTemplate, data );
		}
        this.$el.html( compiledTemplate ); 
        
	    // Toggle fullscreen button:
	    $('#toggle-fullscreen').button().click(function () {
	        var button = $(this),
	            root = document.documentElement;
	        if (!button.hasClass('active')) {
	            $('#modal-gallery').addClass('modal-fullscreen modal-fullscreen-stretch');
	            if (root.webkitRequestFullScreen) {
	                root.webkitRequestFullScreen(
	                    window.Element.ALLOW_KEYBOARD_INPUT
	                );
	            } else if (root.mozRequestFullScreen) {
	                root.mozRequestFullScreen();
	            }
	            setTimeout(function () {
			    	$('#modal-gallery').modal('show');
				}, 500);
		        $('#modal-gallery').modal('hide');
	        } else {
	            $('#modal-gallery').removeClass('modal-fullscreen modal-fullscreen-stretch');
	            (document.webkitCancelFullScreen ||
	                document.mozCancelFullScreen ||
	                $.noop).apply(document);
	            setTimeout(function () {
			    	$('#modal-gallery').modal('show');
				}, 500);
		        $('#modal-gallery').modal('hide');
	        }
	    });
	    
	    if ( this.options.userId != undefined ) {
		    this.$( ".imgtitle" ).editable({
			    type: 'text',
			    pk: 1,
			    title: '输入图片标题',
			    name: 'title'
			}, {
				ajaxOptions: {
				    dataType: 'json'
				}
		    });
		    this.$( ".imgdes" ).editable({
			    type: 'textarea',
			    pk: 1,
			    title: '输入图片描述',
			    name: 'description'
			}, {
				ajaxOptions: {
				    dataType: 'json'
				}
		    });
	    }
        
        return this;
      },
      
      addImgs: function() {
      	var imageUploadView = new ImageUploadView({category: this.currentCat});
      	imageUploadView.render();
      },
      
      addCat: function() {
      	var newCategoryView = new NewCategoryView({category: this.currentCat, el: this.$("#gallerymain")});
      	newCategoryView.render();
      }
      
      


  });

  return GalleryMainView;

});
