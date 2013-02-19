define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var PostModel = Backbone.Model.extend({
  	  defaults : {
      },  

      initialize: function( attributes, options ) {
  			this.action = options.action; 
  	  },

	  url : function() {
	      if ( this.action == "save" ) {
	      	  return '/blog/post';
	      } else if ( this.action == "getPost" ) {
	          return '/blog/post/' + this.get( "id" );
	      } else if ( this.action == "updateStatus" ) {
	          return '/blog/post/' + this.get( "postId" ) + '/status/' + this.get( "status" );
	      }else if ( this.action == "updatePost" ) {
	          return '/blog/post';
	      }
	  }
  });

  return PostModel;

});
