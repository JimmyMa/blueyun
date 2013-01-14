define([
  'jquery',
  'underscore',
  'backbone',
  'views/gallery/ImageUploadView',
  'text!templates/users/actionsTemplate.html'
], function($, _, Backbone, ImageUploadView, actionsTemplate){

  var UserActionsView = Backbone.View.extend({
    el: $("#userAction"),
    
    events: {
      'click #newGallery'        : 'newGallery',
      
    },

    render: function(){

      var that = this;

      var data = {
         user: this.model,
         _: _
      };

      var compiledTemplate = _.template( actionsTemplate, data );
    
      this.$el.html(compiledTemplate);
    },
    
    newGallery: function(){
       alert( "sdf" );
       var imageUploadView = new ImageUploadView();
       imageUploadView.render();
    }

  });

  return UserActionsView;
  
});
