// Filename: utils.js
define([
  'jquery', 
  'underscore'
], function($, _){
  var utils = {
  	goTop: function(acceleration, time) {  
		$("html, body").animate({ scrollTop: 0 }, "slow");
    },
    initUYan: function( su ) {
		if ( window.UYAN ) {
		   window.UYAN.getSu = function() {
		      return su;
		   };
		} else {
		    window.uyan_config = {
		        'du':'blueyun.herokuapp.com',
		        'su': su
		    };
	    }
	    delete window.uyan_loaded;
        document.getElementById("UYScript").src = "http://v1.uyan.cc/js/iframe.js?UYUserId=1739842&cdnversion=" + Math.random();
	    if ( window.UYAN )  {
	        UYAN.init();
	    	UYAN.reqItf( {mode: "getcmt" } );
	    }
	}
    
  };

  return utils;
});
