define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/users/registerFormTemplate.html'
], function($, _, Backbone, registerFormTemplate){

  var RegisterFormView = Backbone.View.extend({
    el: $("#page"),
    
    events: {
      "click #registerBtn":  "register"
    },

    render: function(){

      var that = this;

      var data = {
        
      };

      var compiledTemplate = _.template( registerFormTemplate, data );
    
      this.$el.html(compiledTemplate);
    },
    
    register: function(e){
        var email = this.$( "#remail" ).val();
        var name = this.$( "#rname" ).val();
        var password = this.$( "#rpassword" ).val();
        var newUser = {
        	email: email,
        	name: name,
        	password: password
        };
		$.ajax({ url: "/user", data: JSON.stringify(newUser), context: window, 
		    type: "POST", 
		    dataType:"json",
		    contentType: 'application/json',
		    success: function(data, textStatus, jqXHR){
        	   app_router.navigate("/", {trigger: true});
        	},
        	error: function(){
        	   alert( "failed" );
      	}});
    
    }

  });

  return RegisterFormView;
  
});
