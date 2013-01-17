define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/users/loginFormTemplate.html',
  'views/users/UserActionsView',
  'views/users/RegisterFormView'
], function($, _, Backbone, loginFormTemplate, UserActionsView, RegisterFormView){

  var UserLoginView = Backbone.View.extend({
    el: $("#userAction"),
    
    events: {
      "click #signin":  "signin"
    },

    render: function(){

      var that = this;

      var data = {
        
      };

      var compiledTemplate = _.template( loginFormTemplate, data );
    
      this.$el.html(compiledTemplate);
    },
    
    signin: function(e){
        var email = this.$( "#email" ).val();
        var signindata = {
        	email: email,
        	password: this.$( "#password" ).val()
        };
		$.ajax({ url: "/login", data: JSON.stringify(signindata), context: this.$el, 
		    type: "POST", 
		    dataType:"json",
		    contentType: 'application/json',
		    success: function(data, textStatus, jqXHR){
        	   var userActionsView = new UserActionsView( {model: data} );
         	   userActionsView.render();
         	   sessionStorage.setItem('userid', data.id);
         	   sessionStorage.setItem('username', data.name);
        	},
        	error: function(){
        	   alert( "登陆失败！！" );
      	}});
    
    }

  });

  return UserLoginView;
  
});
