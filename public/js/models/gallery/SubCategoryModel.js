define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var SubCategoryModel = Backbone.Model.extend({

      initialize: function() {
  	  },

	  url : function() {
	      return '/gallery/subcat/' + this.get( "subcatId" );
	  }

    });

  	return SubCategoryModel;

});
