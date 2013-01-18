// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/footer/FooterView',
  'views/users/RegisterFormView',
  'views/gallery/GalleryMainView',
  'views/users/UserLoginView',
  'views/users/UserActionsView'
], function($, _, Backbone, HomeView, 
	FooterView, RegisterFormView, GalleryMainView, 
	UserLoginView, UserActionsView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'gallery/cat/:catId/:pageId': 'showGallery',
      'gallery/cat/:catId': 'showGallery',
      'mygallery/cat/:catId': 'showMyGallery',
      'mygallery/cat/:catId/:pageId': 'showMyGallery',
      'newuser': 'newUser',
      'exit': 'exit',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    window.app_router = new AppRouter;
    
    var initPage = function() {
        $("#userAction").unbind();
        if (sessionStorage.getItem('userid') == null ) {
	       var userLoginView = new UserLoginView();
	       userLoginView.render();
	    } else {
	       var model = { name: sessionStorage.getItem('username'),
	       	 id: sessionStorage.getItem('userid') 
	       };
	       var userActionsView = new UserActionsView( {model: model} );
	       userActionsView.render();
	    }
        var footerView = new FooterView();
        footerView.render();
	};


    app_router.on('route:showGallery', function (catId, pageId) {
        $("#page").unbind();
        pageId = pageId == undefined ? 1 : pageId; 
        var galleryMainView = new GalleryMainView({catId: catId, pageId: pageId});
        initPage();
    });
    
    app_router.on('route:showMyGallery', function (catId, pageId) {
        $("#page").unbind();
        pageId = pageId == undefined ? 1 : pageId; 
        var galleryMainView = new GalleryMainView({catId: catId, pageId: pageId, userId: sessionStorage.getItem('userid') });
        initPage();
    });
    
    app_router.on('route:newUser', function () {
    
       var registerFormView = new RegisterFormView();
   	   registerFormView.render();
    });
    
    app_router.on('route:exit', function () {
       sessionStorage.removeItem('userid');
       window.app_router.navigate("/", {trigger: true});
    });
    
    app_router.on('route:defaultAction', function (actions) {
        console.log( "Action:" + actions );
        $("#page").unbind();
        var galleryMainView = new GalleryMainView({catId: 0, pageId: 1});
        initPage();

    });
    

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
