// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/projects/ProjectsView',
  'views/footer/FooterView',
  'views/users/RegisterFormView',
  'views/gallery/GalleryMainView',
  'views/gallery/ImageUploadView',
  'views/users/UserLoginView',
  'views/users/UserActionsView'
], function($, _, Backbone, HomeView, ProjectsView, 
	FooterView, RegisterFormView, GalleryMainView, ImageUploadView, 
	UserLoginView, UserActionsView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'gallery/cat/:catId': 'showGallery',
      'mygallery/cat/:catId': 'showMyGallery',
      'newuser': 'newUser',
      'exit': 'exit',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    window.app_router = new AppRouter;
    
    var initPage = function() {
        if (localStorage.getItem('userid') == null ) {
	       var userLoginView = new UserLoginView();
	       userLoginView.render();
	    } else {
	       var model = { name: localStorage.getItem('username'),
	       	 id: localStorage.getItem('userid') 
	       };
	       var userActionsView = new UserActionsView( {model: model} );
	       userActionsView.render();
	    }
        var footerView = new FooterView();
        footerView.render();
	};


    app_router.on('route:showGallery', function (catId) {
        var galleryMainView = new GalleryMainView({catId: catId});
        initPage();
    });
    
    app_router.on('route:showMyGallery', function (catId) {
        var galleryMainView = new GalleryMainView({catId: catId, userId: localStorage.getItem('userid') });
        initPage();
    });
    
    app_router.on('route:newGallery', function () {
       var imageUploadView = new ImageUploadView();
       imageUploadView.render();
    });
    
    app_router.on('route:newUser', function () {
    
       var registerFormView = new RegisterFormView();
   	   registerFormView.render();
    });
    
    app_router.on('route:exit', function () {
       localStorage.removeItem('userid');
       window.app_router.navigate("/", {trigger: true});
    });
    
    app_router.on('route:defaultAction', function (actions) {
     
        var galleryMainView = new GalleryMainView({catId: 0});
        initPage();

    });
    

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
