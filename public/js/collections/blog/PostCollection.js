define([
  'underscore',
  'backbone',
  'models/blog/PostModel'
], function(_, Backbone, PostModel){

  var PostCollection = Backbone.Collection.extend({
      
      initialize : function(models, options) {
         this.action = options.action;
      },
      
      url : function() {
      	  if ( this.action == "postsview" ) {
              return "/blog/posts";
          } if ( this.action == "postsmgm" ) {
          	 return '/blog/postsmgm';
          } else {
          
          }
      },
    
      parse : function(data) {
          return data;
      }
      

     
  });

  return PostCollection;

});