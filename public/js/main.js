// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: '/assets/js/libs/jquery/jquery-min',
    'jquery.ui.widget': '/assets/js/libs/jquery/jquery.ui.widget',
    underscore: '/assets/js/libs/underscore/underscore-min',
    backbone: '/assets/js/libs/backbone/backbone-min',
    bootstrap: '/assets/js/libs/bootstrap/bootstrap',
    templates: '/assets/templates',
    'jquery.fileupload': '/assets/js/libs/fileupload/js/jquery.fileupload',
    'jquery.fileupload-fp': 'libs/fileupload/js/jquery.fileupload-fp',
    'fileupload-ui': '/assets/js/libs/fileupload/js/jquery.fileupload-ui',
    tmpl: '/assets/js/libs/fileupload/js/tmpl.min',
    'load-image': '/assets/js/libs/fileupload/js/load-image.min',
    'canvas-to-blob': '/assets/js/libs/fileupload/js/canvas-to-blob.min',
    'image-gallery': '/assets/js/libs/imagegallery/bootstrap-image-gallery',
    'bootstrap-editable': '/assets/js/libs/bootstrap-editable/js/bootstrap-editable',
    
  }

});

require([
  // Load our app module and pass it to our definition function
  'jquery',
  'underscore',
  'backbone',
  'app',
], function($,_,Backbone,App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
