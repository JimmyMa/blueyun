define([
  'jquery',
  'underscore',
  'backbone',
  'collections/gallery/ImageCollection',
  'text!templates/gallery/imageSliderTemplate.html',
  'utils'
], function($, _, Backbone, ImageCollection, imageSliderTemplate, utils){
  
  var ImageSliderView = Backbone.View.extend({
    tagName: "div",
    initialize : function() {
      var that = this;
      that.onDataHandler = function(collection) {
          that.render();
      }
	  that.imageCollection = new ImageCollection(null, {action: "getCatImags"}); 
	  that.imageCollection.imgId = this.options.imgId;
	  that.imageCollection.fetch({ success : that.onDataHandler });
    },

    render : function() {

      var data = {
          images: this.imageCollection.models[0].toJSON(),
          catParents : this.imageCollection.models[1].toJSON(),
          currentCat : this.imageCollection.models[2].toJSON(),
          currentImgId: this.options.imgId,
          _: _
      }
      var compiledTemplate = _.template( imageSliderTemplate, data );
      this.$el.html( compiledTemplate ); 
	  $('#myCarousel').carousel('pause').on('slid', function() {
	      var imgId = $('.active.item', this).children("img").data("imgid");
	      utils.initUYan( "gallery/img/" + imgId );

		  var $nextImage = $('.active.item', this).next('.item').find('img');
		  if (  $nextImage.attr('src') == null ) {
		  	$nextImage.attr('src', $nextImage.data('lazy-load-src'));
		  }

		  var $preImage = $('.active.item', this).prev('.item').find('img');
		  if (  $preImage.attr('src') == null ) {
		  	$preImage.attr('src', $preImage.data('lazy-load-src'));
		  }

		  window.app_router.navigate("gallery/img/" + imgId, {trigger: false});
      });
      
	  var $nextImage = $('.active.item', this.$el).next('.item').find('img');
	  $nextImage.attr('src', $nextImage.data('lazy-load-src'));

	  var $preImage = $('.active.item', this.$el).prev('.item').find('img');
	  $preImage.attr('src', $preImage.data('lazy-load-src'));

	  if ( this.options.callback ) {
	     this.options.callback();
	  }	
    }


  });

  return ImageSliderView;

});
