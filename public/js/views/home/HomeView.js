define([
  'jquery',
  'underscore',
  'backbone',
  'collections/gallery/ImageCollection',
  'views/gallery/GalleryMainView',
  'text!templates/home/homeTemplate.html',
  'text!templates/home/homeSlideTemplate.html'
], function($, _, Backbone, ImageCollection, GalleryMainView, 
	homeTemplate, homeSlideTemplate){

  var HomeView = Backbone.View.extend({
    tagName: "div",
    
    initialize : function() {
      var that = this;
      that.onDataHandler = function(collection) {
          that.render();
      }
      
      that.galleryMainView = new GalleryMainView({catId: 0, pageId: 1, navBar: false});
    
	  that.imageCollection = new ImageCollection( null, {action: "getPopImags"}); 
	  that.imageCollection.fetch({ success : that.onDataHandler });
    },

    render: function(){
      var compiledTemplate = _.template( homeTemplate );
      this.$el.html(compiledTemplate);
      
      var data = {
          images: this.imageCollection.toJSON(),
          _: _
      }
      compiledTemplate = _.template( homeSlideTemplate, data );
      this.$( "#homeSlide" ).html( compiledTemplate );
	  $('#myCarousel').carousel().on('slid', function() {
		  var $nextImage = $('.active.item', this).next('.item').find('img');
		  $nextImage.attr('src', $nextImage.data('lazy-load-src'));
      });
      
      
      this.assign( this.galleryMainView, "#homeMain" );
 
    }

  });

  return HomeView;
  
});
