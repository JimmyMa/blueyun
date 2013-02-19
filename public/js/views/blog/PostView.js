define([
  'jquery',
  'underscore',
  'backbone',
  'models/blog/PostModel',
  'text!templates/blog/postTemplate.html',
  'utils',
  'prettify'
], function($, _, Backbone, PostModel, postTemplate, utils){
  
  var PostView = Backbone.View.extend({
    tagName: "div",
    events: {

    },
    
    initialize : function() {
      var that = this;
      that.onDataHandler = function(collection) {
          that.render();
      }
	  that.postModel = new PostModel( {postId: this.options.postId }, {action: "getPost"} ); 
	  that.postModel.fetch({ success : that.onDataHandler });
    },

    render : function() {
   
        var that = this;
        
        var data = {
        	post: that.postModel.toJSON(),
        	_: _
        }
		var compiledTemplate = _.template( postTemplate, data );
        this.$el.html( compiledTemplate ); 
        
        prettyPrint();
        
        utils.initUYan( "blog/post/" + this.options.postId );
        
        if ( this.options.callback ) {
		   this.options.callback();
		}	
        
        return this;
      },


  });

  return PostView;

});
