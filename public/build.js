({
    baseUrl: "./js",
  paths: {
    jquery: 'libs/jquery/jquery-min',
    'jquery.ui.widget': 'libs/jquery/jquery.ui.widget',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    bootstrap: 'libs/bootstrap/bootstrap',
    templates: '../templates',
    'jquery.fileupload': 'empty:',
    'fileupload-ui': 'empty:',
    tmpl: 'empty:',
    'load-image': 'empty:',
    'canvas-to-blob': 'empty:',
    'image-gallery': 'empty:',
    'bootstrap-editable': 'empty:',
    'app': 'app',
    'uitls': 'utils',
    'router': 'router',
    'jquery.fileupload-fp': 'empty:',
    'kindeditor': 'empty:',
    'prettify': '../kindeditor/plugins/code/prettify'
  },

    name: "main",
    out: "js/main-built.js",
    optimize: "uglify2"
})