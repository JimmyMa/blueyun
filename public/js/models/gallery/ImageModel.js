define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var ImageModel = Backbone.Model.extend({

  	  defaults : {
          userId: 0,
          status: 0
      },  

      initialize: function( model, options ) {
  			this.action = options.action; 
  	  },

	  url : function() {
	      if ( this.action == "updateStatus" ) {
	      	  return '/' + this.get( "userId" ) + '/gallery/img/s/' + this.id;
	      } else if ( this.action == "faverite" ) {
	      	  return '/gallery/img/faverite/' + this.id;
	      } else {
	        return '/' + this.get( "userId" ) + '/gallery/img/' + this.id;
	      }
	  }

    });

  	return ImageModel;

});
