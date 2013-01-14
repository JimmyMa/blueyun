define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, SidebarView, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      
      $('#main-menu-left li').removeClass('active');
      $('#main-menu-left li a[href="#"]').parent().addClass('active');
      this.$el.html(homeTemplate);
 
    }

  });

  return HomeView;
  
});
