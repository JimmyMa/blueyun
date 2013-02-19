package controllers;

import java.io.File;
import java.util.Date;
import java.util.List;

import models.User;
import models.blog.Post;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;
import blueyun.files.upload.FileUpload;
import blueyun.files.upload.FileUploadResult;
import controllers.common.ControllersUtils;

public class Blog extends Controller {

	public static Result createPost() {
		JsonNode vendorJson = request().body().asJson();
		Post post = Json.fromJson(vendorJson, Post.class);
		if ( post == null) {
            return badRequest( ControllersUtils.getErrorMessage( "Failed to save Post!" ) );
        } else {
        	post.create_date = new Date();
        	post.user = User.find.byId( Secured.getUserId() );
        	post.save();
            return ok(ControllersUtils.getSuccessMessage( "OK!") );
        }

	}
	
	public static Result updatePost() {
		JsonNode vendorJson = request().body().asJson();
		Post post = Json.fromJson(vendorJson, Post.class);
		if ( post == null) {
            return badRequest( ControllersUtils.getErrorMessage( "Failed to update Post!" ) );
        } else {
        	Logger.info( "postId:" + post.id );
        	Logger.info( "postTitle:" + post.title );
        	post.update();
            return ok(ControllersUtils.getSuccessMessage( "OK!") );
        }

	}
	
	public static Result getPosts() {
		List<Post> posts = Post.find.where()
				.eq("status", 2)
				.orderBy( "id desc"  ).findList();
		
		for( Post post : posts ) {
			post.content = post.content.replaceAll( "<([a-zA-Z][a-zA-Z0-9]|/*)[^>]*>", "");
			if ( post.content.length() > 200 ) {
				post.content = post.content.substring( 0, 200 );
			}
			
			if ( post.tags != null ) {
				post.tagsList = post.tags.split( "," );
			}
		}

		return ok( Json.toJson(posts));
	}
	
	public static Result getPostsMgm() {
		
		List<Post> posts = Post.find.where()
				.eq("user.id", Secured.getUserId())
				.orderBy( "id desc"  ).findList();
		
		for( Post post : posts ) {
			post.content = "";
			post.tags = "";
		}

		return ok( Json.toJson(posts));
	}
	
	public static Result getPost( Long id ) {
		Post post = Post.find.byId( id );
		
		if ( post.tags != null ) {
			post.tagsList = post.tags.split( "," );
		}
	
		return ok( Json.toJson(post));
	}
	
	public static Result updatePostStatus( Long id, int status ) {
		Post post = Post.find.byId( id );
		
		post.status = status;
		post.save();
	
		return ok( ControllersUtils.getSuccessMessage( "OK") );
	}
	
	
	public static Result uploadJSON() {
		MultipartFormData body = request().body().asMultipartFormData();
		FilePart filePart = body.getFiles().get(0);
		  
		if (filePart != null) {
		    String fileName = filePart.getFilename();
		    String contentType = filePart.getContentType(); 
		    File file = filePart.getFile();
		    FileUploadResult result;
		    try {
		    	if ( contentType.startsWith( "image/") ) {
		    		result = FileUpload.uploadImageFile(file, fileName, contentType, Secured.getUserId(), false);
		    	} else {
		    		result = FileUpload.uploadFile(file, fileName, Secured.getUserId());
		    	}
		    } catch ( Exception e ) {
		    	e.printStackTrace();
		    	return badRequest( ControllersUtils.getErrorMessage( "Missing file!" ) );
		    }
		    
		    ObjectNode obj = Json.newObject();
			obj.put("error", 0);
			obj.put("url", result.files.get(0).url);

		    Logger.info( "uploadFile URL: " + result.files.get(0).url + ":" + contentType );
		    
		    return ok(obj.toString());
		} else {
		    flash("error", "Missing file");
		    return badRequest( ControllersUtils.getErrorMessage( "Missing file!" ) );
		}
	}
}
