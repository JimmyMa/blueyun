define([
  'jquery',
  'underscore',
  'backbone',
  'models/blog/PostModel',
  'text!templates/blog/editPostTemplate.html',
  'utils',
  'kindeditor',
  'prettify'
], function($, _, Backbone, PostModel, editPostTemplate, utils){
  
  var EditPostView = Backbone.View.extend({
    tagName: "div",
    events: {
      "click #savePost":  "savePost",
    },
    
    initialize : function() {
      var that = this;
      that.onDataHandler = function(collection) {
          that.render();
      }
	  that.postModel = new PostModel( {id: this.options.postId }, {action: "getPost"} ); 
	  that.postModel.fetch({ success : that.onDataHandler });
    },

    render : function() {
   
        var that = this;
        
        var data = {
        	post: that.postModel.toJSON(),
        	_: _
        }
		var compiledTemplate = _.template( editPostTemplate, data );
        this.$el.html( compiledTemplate ); 
        
		KindEditor.basePath = '/assets/kindeditor/';
		this.editor = KindEditor.create('textarea[name="content"]', {
		    uploadJson : '/blog/uploadfile'
		});
		
        prettyPrint();
        
        if ( this.options.callback ) {
		   this.options.callback();
		}	
        
        return this;
      },

     savePost : function() {
     
       this.postModel.set( "title", this.$( "#title" ).val() );
       this.postModel.set( "tags", this.$( "#tags" ).val() );
       this.postModel.set( "content", this.editor.html() );
       this.postModel.action = "updatePost";
       
       this.postModel.save(null, {success : function(post) {
			window.app_router.navigate("blog/mgm/posts", {trigger: true});
     	}});
     }

  });

  return EditPostView;

});
