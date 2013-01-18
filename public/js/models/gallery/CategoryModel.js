define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var CategoryModel = Backbone.Model.extend({

  	  defaults : {
      },  

      initialize: function( attributes, options ) {
  			this.action = options.action; 
  	  },

	  url : function() {
	      if ( this.action == "save" ) {
	      	  return '/gallery/cat';
	      } else if ( this.action == "updateStatus" ) {
	      	  return '/' + this.get( "userId" ) + '/gallery/cat/s/' + this.id;
	      } else {
	          return '/' + this.get( "userId" ) + '/gallery/cat/' + this.id;
	      }
	  }

    });

  	return CategoryModel;

});
