define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var UserModel = Backbone.Model.extend({

  	  defaults : {
          query : "unknown"
      },  

      initialize: function( options ) {
  			this.action = options.action; 
  	  },

	  url : function() {
	      return 'https://api.github.com/users/' + this.query;
	  },
	    
	  parse : function(res) { 
        // because of jsonp 
	        return res.data;
	  }

    });

  	return UserModel;

});
