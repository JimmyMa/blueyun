define([
  'jquery',
  'underscore',
  'backbone',
  'collections/blog/PostCollection',
  'models/blog/PostModel',
  'text!templates/blog/postsMgmTemplate.html'
], function($, _, Backbone, PostCollection, PostModel, postsMgmTemplate){
  
  var PostsMgmView = Backbone.View.extend({
    tagName: "div",
    events: {
    	"click .changeStatus":  "changeStatus"
    },
    
    initialize : function() {
      var that = this;
      that.onDataHandler = function(collection) {
          that.render();
      }
	  that.postCollection = new PostCollection(null,{action: "postsmgm"}); 
	  that.postCollection.fetch({ success : that.onDataHandler });
    },

    render : function() {
   
        var that = this;
        
        var data = {
        	posts: that.postCollection.toJSON(),
        	_: _
        }
		var compiledTemplate = _.template( postsMgmTemplate, data );
        this.$el.html( compiledTemplate ); 
        
        return this;
      },
      
      changeStatus: function(e) {
	    	e.preventDefault();
	    	var target = e.target;
	    	var postId = target.dataset.postid;
	    	var status = target.dataset.status;
	    	var postModel = new PostModel( {postId: postId, status: status }, {action: "updateStatus"} );
	    	postModel.save({success: function(model, response) {
		    	//that.categoryCollection.fetch({ success : that.onDataHandler });
			}});
      },


  });

  return PostsMgmView;

});
