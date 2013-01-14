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
	      } else {
	          return '/gallery/' + this.userid + '/cat/' + this.catid;
	      }
	  }

    });

  	return CategoryModel;

});
