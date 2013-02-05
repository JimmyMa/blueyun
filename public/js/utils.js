// Filename: utils.js
define([
  'jquery', 
  'underscore'
], function($, _){
  var utils = {
  	goTop: function(acceleration, time) {  
		$("html, body").animate({ scrollTop: 0 }, "slow");
    }  
  };

  return utils;
});
