define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var ImageModel = Backbone.Model.extend({

  	  defaults : {
          subcatid: "unknown"
      },  

      initialize: function( options ) {
  			this.action = options.action; 
  	  },

	  url : function() {
	      return '/gallery/' + this.userid + '/cat/' + this.catid;
	  }

    });

  	return ImageModel;

});
