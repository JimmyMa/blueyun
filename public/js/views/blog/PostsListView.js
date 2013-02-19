define([
  'jquery',
  'underscore',
  'backbone',
  'collections/blog/PostCollection',
  'text!templates/blog/postsListTemplate.html'
], function($, _, Backbone, PostCollection, postsListTemplate){
  
  var PostListView = Backbone.View.extend({
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
	  that.postCollection = new PostCollection(null,{action: "postsview"}); 
	  that.postCollection.fetch({ success : that.onDataHandler });
    },

    render : function() {
   
        var that = this;
        
        var data = {
        	posts: that.postCollection.toJSON(),
        	_: _
        }
		var compiledTemplate = _.template( postsListTemplate, data );
        this.$el.html( compiledTemplate ); 
        
        return this;
      },
      
      addImgs: function() {

      },
      
      addCat: function() {

      }

  });

  return PostListView;

});
