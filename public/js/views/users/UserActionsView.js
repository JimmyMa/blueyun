define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/users/actionsTemplate.html'
], function($, _, Backbone, actionsTemplate){

  var UserActionsView = Backbone.View.extend({
    el: $("#userAction"),
    
    events: {
      
    },

    render: function(){

      var that = this;

      var data = {
         user: this.model,
         _: _
      };

      var compiledTemplate = _.template( actionsTemplate, data );
    
      this.$el.html(compiledTemplate);
    }

  });

  return UserActionsView;
  
});
