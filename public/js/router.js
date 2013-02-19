// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/footer/FooterView',
  'views/users/RegisterFormView',
  'views/gallery/GalleryMainView',
  'views/gallery/ImageSliderView',
  'views/users/UserLoginView',
  'views/users/UserActionsView',
  'views/blog/PostsListView',
  'views/blog/PostView',
  'utils',
], function($, _, Backbone, HomeView, 
	FooterView, RegisterFormView, GalleryMainView, ImageSliderView,
	UserLoginView, UserActionsView, PostsListView, PostView, utils) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'gallery/cat/:catId/:pageId': 'showGallery',
      'gallery/cat/:catId': 'showGallery',
      'gallery/img/:imgId': 'showImage',
      'mygallery/cat/:catId': 'showMyGallery',
      'mygallery/cat/:catId/:pageId': 'showMyGallery',
      
      'blog/post/:postId': 'readPost',
      'blog/posts': 'postsList',
      'blog/mgm/post': 'newPost',
      'blog/mgm/posts': 'postsmgm',
      'blog/mgm/post/:postId': 'editPost',
      
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
        
        var callback = function() {
        	utils.goTop();
        };

        $("#page").unbind();
        pageId = pageId == undefined ? 1 : pageId; 
        var galleryMainView = new GalleryMainView({catId: catId, pageId: pageId, callback: callback});
        galleryMainView.setElement($("#page"));
        

    });
    
    app_router.on('route:showImage', function (imgId) {
        initPage();
        
        var callback = function() {
        	utils.goTop();
        };

        $("#page").unbind();
        var imageSliderView = new ImageSliderView({imgId: imgId, callback: callback});
		imageSliderView.setElement($("#page"));
		
		utils.initUYan( "gallery/img/" + imgId );
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
    
    
    app_router.on('route:newPost', function () {
        initPage();

        $("#page").unbind();
        
        require( ['views/blog/NewPostView'], function(NewPostView) {
        	var newPostView = new NewPostView();
	        newPostView.setElement($("#page")).render();
        });
    });

    
    app_router.on('route:postsmgm', function () {
        initPage();
        
        $("#page").unbind();
        require( ['views/blog/PostsMgmView'], function(PostsMgmView) {
        	var postsMgmView = new PostsMgmView();
	        postsMgmView.setElement($("#page"));
        });
    });

    app_router.on('route:editPost', function (postId) {
        initPage();
        
        $("#page").unbind();
        require( ['views/blog/EditPostView'], function(EditPostView) {
        	var editPostView = new EditPostView({postId: postId});
	        editPostView.setElement($("#page"));
        });
    });

    app_router.on('route:readPost', function (postId) {
        initPage();
        
        $('#main-menu li').removeClass('active');
        $('#main-menu li a[href="#/blog/posts"]').parent().addClass('active');

        $("#page").unbind();
        var postView = new PostView({postId: postId, callback: utils.goTop});
        postView.setElement($("#page"));
    });
    
    app_router.on('route:postsList', function () {
        initPage();
        
        $('#main-menu li').removeClass('active');
        $('#main-menu li a[href="#/blog/posts"]').parent().addClass('active');
        
        $("#page").unbind();
        var postsListView = new PostsListView();
        postsListView.setElement($("#page")).render();
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

		utils.initUYan( "main" );
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
