define([
  'jquery',
  'underscore',
  'backbone',
  'models/blog/PostModel',
  'text!templates/blog/newPostTemplate.html',
  'kindeditor',
  'prettify'
], function($, _, Backbone, PostModel, newPostTemplate){
  
  var NewCategoryView = Backbone.View.extend({
    tagName: "div",
    
    events: {
      "click #addPost":  "addPost",
    },
    
    initialize : function() {
    },

    render : function() {
   
        var that = this;

		var data = {
		};

        var compiledTemplate = _.template( newPostTemplate, data );
        that.$el.html( compiledTemplate ); 
        
		KindEditor.basePath = '/assets/kindeditor/';
		this.editor = KindEditor.create('textarea[name="content"]', {
		    uploadJson : '/blog/uploadfile'
		});

        return this;
      },
      
     addPost : function() {
     
       var title = this.$( "#title" ).val();
       var tags = this.$( "#tags" ).val();
       var status = this.$( "#status" ).val();
       var content = this.editor.html();
       
       var post = new PostModel({title: title, content: content, tags: tags, status: status }, {action: 'save'});
       post.save(null, {success : function(post) {
			window.app_router.navigate("blog/mgm/posts", {trigger: true});
     	}});
     }


  });

  return NewCategoryView;

});
