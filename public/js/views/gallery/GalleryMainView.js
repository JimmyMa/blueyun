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
  'bootstrap-editable'
], function($, _, Backbone, CategoryCollection, ImageModel, CategoryModel, ImageUploadView, 
    NewCategoryView, galleryMainTemplate, galleryHomeTemplate){
  
  var GalleryMainView = Backbone.View.extend({
    tagName: "div",
    events: {
    	"click #addImgs":  "addImgs",
    	"click #addCat": "addCat"
    },
    
    initialize : function() {
      var that = this;
      that.onDataHandler = function(collection) {
          that.render();
      }
      that.navBar = this.options.navBar == undefined ? true : this.options.navBar == undefined;
	  that.categoryCollection = new CategoryCollection(); 
	  that.categoryCollection.catId = this.options.catId;
	  that.categoryCollection.pageId = this.options.pageId;
	  that.categoryCollection.userId = this.options.userId;
	  that.categoryCollection.fetch({ success : that.onDataHandler });
    },

    render : function() {
   
        var that = this;
        
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
        	navBar: that.navBar,
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
		    	var imageModel = new ImageModel( {id: id, userId: that.options.userId }, {action: "delete"} );
		    	imageModel.destroy({success: function(model, response) {
			    	that.categoryCollection.fetch({ success : that.onDataHandler });
				}});
		    });
		    
		    $( ".updateImgStatus" ).on( "click", function( e ) {
		    	e.preventDefault();
		    	var theEle = $(this);
		    	var id = this.dataset.id;
		    	var status = theEle.attr( "data-status" );
		    	status = (status == 0 ? "1" : "0");
		    	var imageModel = new ImageModel( {id: id, userId: that.options.userId, status: status }, {action: "updateStatus"} );
		    	imageModel.save(null, {success: function(model, response) {
		    	    if ( status == 1 ) {
		    	    	theEle.parents( "div.thumbnail" ).addClass( "status_notpublic" );
		    	    	theEle.text( "公开" );
		    	    	theEle.attr( "data-status", status );
		    	    } else {
		    	        theEle.parents( "div.thumbnail" ).removeClass( "status_notpublic" );
		    	        theEle.text( "隐藏" );
		    	        theEle.attr( "data-status", status );
		    	    }
				}});
		    });
		    
		    $( ".updateCatStatus" ).on( "click", function( e ) {
		    	e.preventDefault();
		    	var theEle = $(this);
		    	var id = this.dataset.id;
		    	var status = theEle.attr( "data-status" );
		    	status = (status == 0 ? "1" : "0");
		    	var categoryModel = new CategoryModel( {id: id, userId: that.options.userId, status: status }, {action: "updateStatus"} );
		    	categoryModel.save(null, {success: function(model, response) {
		    	    if ( status == 1 ) {
		    	    	theEle.parents( "div.thumbnail" ).addClass( "status_notpublic" );
		    	    	theEle.text( "公开" );
		    	    	theEle.attr( "data-status", status );
		    	    } else {
		    	        theEle.parents( "div.thumbnail" ).removeClass( "status_notpublic" );
		    	        theEle.text( "隐藏" );
		    	        theEle.attr( "data-status", status );
		    	    }
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
	    } else {
			$('#modal-gallery').on('displayed', function () {
			    var modalData = $(this).data('modal');
			    var imgId = $(modalData.$links[modalData.options.index]).data( "id" );
			    var imageModel = new ImageModel( {id: imgId }, {action: "faverite"} );
			    imageModel.fetch();
			});
	    }
	    
	    this.$( ".pagination ul > li > a" ).on( "click", function( e ) {
	    	e.preventDefault();
	    	if ( this.id == "prePage" ) {
		    	var curentPage = that.pagingresult["currentPage"];
		    	if ( curentPage > 1 ) { 
		    		window.app_router.navigate(that.rooturl + "cat/" + that.currentCat.id + "/" + (curentPage-1), {trigger: true});
		    	} 
	    	} else if ( this.id == "nextPage" ) {
		    	var curentPage = that.pagingresult["currentPage"];
		    	var totalPages = that.pagingresult["totolPages"];
		    	if ( curentPage < totalPages ) { 
		    		window.app_router.navigate(that.rooturl + "cat/" + that.currentCat.id + "/" + (curentPage+1), {trigger: true});
		    	} 
	    	} else {
	    		window.app_router.navigate(that.rooturl + "cat/" + that.currentCat.id + "/" + this.text, {trigger: true});
	    	} 
	    });
	    
	    if ( this.options.callback ) {
	    	this.options.callback();
	    }	    
        
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
