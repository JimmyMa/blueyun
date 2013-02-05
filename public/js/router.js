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
  'views/users/UserActionsView',
  'utils',
], function($, _, Backbone, HomeView, 
	FooterView, RegisterFormView, GalleryMainView, 
	UserLoginView, UserActionsView, utils) {
  
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
        initPage();

        $("#page").unbind();
        pageId = pageId == undefined ? 1 : pageId; 
        var galleryMainView = new GalleryMainView({catId: catId, pageId: pageId});
        galleryMainView.setElement($("#page"));
        utils.goTop();

    });
    
    app_router.on('route:showMyGallery', function (catId, pageId) {
        initPage();

        $('#main-menu li').removeClass('active');
        $('#main-menu li a[href="#/mygallery/cat/0"]').parent().addClass('active');

        $("#page").unbind();
        pageId = pageId == undefined ? 1 : pageId; 
        var galleryMainView = new GalleryMainView({catId: catId, pageId: pageId, userId: sessionStorage.getItem('userid') });
        galleryMainView.setElement($("#page"));
    });
    
    app_router.on('route:newUser', function () {
       initPage();
    
       var registerFormView = new RegisterFormView();
   	   registerFormView.render();
    });
    
    app_router.on('route:exit', function () {
       sessionStorage.removeItem('userid');
       window.app_router.navigate("/", {trigger: true});
    });
    
    app_router.on('route:defaultAction', function (actions) {
        initPage();
        
        $("#page").unbind();
        
        $('#main-menu-left li').removeClass('active');
        $('#main-menu-left li a[href="#"]').parent().addClass('active');

        var homeView = new HomeView();
        homeView.setElement($("#page"));

    });
    
    
    Backbone.View.prototype.assign = function (view, selector) {
	    view.setElement(this.$(selector)).render();
	};
    

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
