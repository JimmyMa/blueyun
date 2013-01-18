define([
  'jquery',
  'underscore',
  'backbone',
  'collections/gallery/CategoryCollection',
  'models/gallery/ImageModel',
  'models/gallery/CategoryModel',
  'views/gallery/ImageUploadView',
  'views/gallery/NewCategoryView',
  'text!templates/gallery/galleryMainTemplate.html',
  'text!templates/gallery/galleryHomeTemplate.html',
  'image-gallery',
  'bootstrap-editable'
], function($, _, Backbone, CategoryCollection, ImageModel, CategoryModel, ImageUploadView, 
    NewCategoryView, galleryMainTemplate, galleryHomeTemplate){
  
  var GalleryMainView = Backbone.View.extend({
    el : $("#page"),
    events: {
    	"click #addImgs":  "addImgs",
    	"click #addCat": "addCat"
    },
    
    initialize : function() {
      var that = this;
      that.onDataHandler = function(collection) {
          that.render();
      }
	  that.categoryCollection = new CategoryCollection(); 
	  that.categoryCollection.catId = this.options.catId;
	  that.categoryCollection.pageId = this.options.pageId;
	  that.categoryCollection.userId = this.options.userId;
	  that.categoryCollection.fetch({ success : that.onDataHandler });
    },

    render : function() {
   
        var that = this;
        
        $('#main-menu-left li').removeClass('active');
        $('#main-menu-left li a[href="#/gallery"]').parent().addClass('active');
        
        this.currentCat = that.categoryCollection.models[3].toJSON();
        this.pagingresult = that.categoryCollection.models[1].toJSON();
        var data = {
        	categories: that.categoryCollection.models[0].toJSON(),
        	images: this.pagingresult["elements"],
        	catParents : that.categoryCollection.models[2].toJSON(),
        	currentCat : this.currentCat,
        	needDivider : this.currentCat.id != undefined,
        	currentPage: this.pagingresult["currentPage"],
        	totolPages: this.pagingresult["totolPages"],
        	_: _
        }
		var compiledTemplate;
		if ( this.options.userId == undefined ) {
			compiledTemplate = _.template( galleryHomeTemplate, data );
			that.rooturl = "/gallery/";
		} else {
			compiledTemplate = _.template( galleryMainTemplate, data );
			that.rooturl = "/mygallery/";
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
			    name: 'title',
				ajaxOptions: {
				    dataType: 'json',
				    type: 'PUT'
				}
		    });
		    this.$( ".imgdes" ).editable({
			    type: 'textarea',
			    pk: 1,
			    title: '输入图片描述',
			    name: 'description',
				ajaxOptions: {
				    dataType: 'json',
				    type: 'PUT'
				}
		    });
		    
		    $( ".deleteImg" ).on( "click", function( e ) {
		    	e.preventDefault();
		    	var id = this.dataset.id;
		    	var imageModel = new ImageModel( {id: id, userId: that.options.userId } );
		    	imageModel.destroy({success: function(model, response) {
			    	that.categoryCollection.fetch({ success : that.onDataHandler });
				}});
		    });
		    
		    $( ".updateImgStatus" ).on( "click", function( e ) {
		    	e.preventDefault();
		    	var id = this.dataset.id;
		    	var status = this.dataset.status;
		    	status = (status == 0 ? "1" : "0");
		    	var imageModel = new ImageModel( {id: id, userId: that.options.userId, status: status }, {action: "updateStatus"} );
		    	imageModel.save({success: function(model, response) {
			    	that.categoryCollection.fetch({ success : that.onDataHandler });
				}});
		    });
		    
		    $( ".deleteCat" ).on( "click", function( e ) {
		    	e.preventDefault();
		    	var id = this.dataset.id;
		    	var categoryModel = new CategoryModel( {id: id, userId: that.options.userId }, {action: "delete"} );
		    	categoryModel.destroy({success: function(model, response) {
			    	that.categoryCollection.fetch({ success : that.onDataHandler });
				}});
		    });
	    }
	    
	    this.$( ".pagination ul > li > a" ).on( "click", function( e ) {
	    	e.preventDefault();
	    	window.app_router.navigate(that.rooturl + "cat/" + that.currentCat.id + "/" + this.text, {trigger: true}); 
	    });
	    
	    
        
        return this;
      },
      
      addImgs: function() {
        window.app_router.navigate(window.location.hash.substr(1) + "/addImgs", {trigger: false});
      	var imageUploadView = new ImageUploadView({category: this.currentCat});
      	imageUploadView.render();
      },
      
      addCat: function() {
        window.app_router.navigate(window.location.hash.substr(1) + "/addCat", {trigger: false});
        $("#gallerymain").unbind();
      	var newCategoryView = new NewCategoryView({category: this.currentCat, el: this.$("#gallerymain")});
      	newCategoryView.render();
      }
      
      


  });

  return GalleryMainView;

});
