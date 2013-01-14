package controllers.gallery;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import models.User;
import models.gallery.Category;
import models.gallery.Image;

import org.codehaus.jackson.JsonNode;

import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;
import blueyun.files.upload.FileUpload;
import blueyun.files.upload.FileUploadResult;
import blueyun.files.upload.UploadedFile;
import controllers.Secured;
import controllers.common.ControllersUtils;

public class Gallery extends Controller {

	public static Result getImagesByCatId( Long id) {
		List<Image> images = Image.findByCatId( id, Secured.getUserId() );
        return ok( Json.toJson(images));
	}
	
	public static Result getCategoriesByParentId( Long id ) {
		List<Category> cats = Category.findByCatId(id );
		List<Image> images = Image.findByCatId( id, Secured.getUserId() );

		if ( id == 0 ) {
			Category cat = new Category();
			cat.id = (long)-1;
			cat.title = "照片";
			cat.description = "这是你的所有照片";
			if ( cats.size() > 0 ) {
				cat.thumbnail = cats.get(0).thumbnail;
			} else {
				cat.thumbnail = "/assets/imgs/thumbnail.jpg";
			}
			cats.add(0, cat);
		}
		List<Category> catTree = Category.findAllParent( id );
		Category currentCat = null;
		if ( catTree.size() > 0 ) {
			currentCat = catTree.remove( catTree.size() - 1 );
		} 
		
		List result = new ArrayList();
		result.add( cats );
		result.add( images );
		result.add( catTree );
		result.add( currentCat );
        return ok( Json.toJson(result));
	}
	
	public static Result getSecuredCategoriesByParentId( Long userid, Long id ) {
		List<Category> cats = Category.findByUserCatId(Secured.getUserId(), id );
		List<Image> images = Image.findByCatId( id, Secured.getUserId() );

		if ( id == 0 ) {
			Category cat = new Category();
			cat.id = (long)-1;
			cat.title = "照片";
			cat.description = "这是你的所有照片";
			if ( cats.size() > 0 ) {
				cat.thumbnail = cats.get(0).thumbnail;
			} else {
				cat.thumbnail = "/assets/imgs/thumbnail.jpg";
			}
			cats.add(0, cat);
		}
		List<Category> catTree = Category.findAllParent( id );
		Category currentCat = null;
		if ( catTree.size() > 0 ) {
			currentCat = catTree.remove( catTree.size() - 1 );
		} 
		
		List result = new ArrayList();
		result.add( cats );
		result.add( images );
		result.add( catTree );
		result.add( currentCat );
        return ok( Json.toJson(result));
	}
	
	public static Result createCategory() {
		JsonNode vendorJson = request().body().asJson();
		Category cat = Json.fromJson(vendorJson, Category.class);
		if ( cat == null) {
            return badRequest( ControllersUtils.getErrorMessage( "username or password is not correct!" ) );
        } else {
        	cat.create_date = new Date();
        	cat.user = User.find.byId( Secured.getUserId() );
        	cat.thumbnail = "/assets/imgs/thumbnail.jpg";
        	cat.parentid = cat.parentid == null ? 0 :  cat.parentid;
        	cat.save();
            return ok(Json.toJson( cat ) );
        }

	}
	
	public static Result updateCategory(Long catId) {
		JsonNode jsonNode = request().body().asJson();
		String title = jsonNode.get( "title" ).asText();
		String description = jsonNode.get( "description" ).asText();
    	Category oldCat = Category.find.byId( catId );
    	if ( description != null ) {
    		oldCat.description = description;
    	}
    	if ( title != null ) {
    		oldCat.title = title;
    	}
    	oldCat.save();
        return ok(Json.toJson( oldCat ) );

	}
	
	public static Result updateImage(Long imgId) {
		String name = request().body().asFormUrlEncoded().get("name")[0];
		String value = request().body().asFormUrlEncoded().get("value")[0];

    	Image oldImg = Image.find.byId( imgId );
    	if ( "description".equals( name ) ) {
    		oldImg.description = value;
    	} else if ( "title".equals( name ) ) {
    		oldImg.title = value;
    	}
    	oldImg.update();
        return ok(Json.toJson( oldImg ) );
	}
	
	public static Result upload(Long catId) {
		  MultipartFormData body = request().body().asMultipartFormData();
		  FilePart filePart = body.getFiles().get(0);
		  
		  if (filePart != null) {
		    String fileName = filePart.getFilename();
		    Logger.info( "FileName " + fileName );
		    String contentType = filePart.getContentType(); 
		    File file = filePart.getFile();
		    FileUploadResult result;
		    try {
		    	result = FileUpload.uploadFile(file, fileName, contentType, Secured.getUserId());
		    } catch ( Exception e ) {
		    	return badRequest( ControllersUtils.getErrorMessage( "Missing file!" ) );
		    }
		    Image img = new Image();
		    img.category = Category.find.byId( catId );
		    img.user = User.find.byId( Secured.getUserId() );
		    UploadedFile uploadedFile = result.files.get(0);
		    img.location = uploadedFile.url;
		    img.thumbnail = uploadedFile.thumbnail_url;
		    img.save();
		    if ( img.category.thumbnail == null || img.category.thumbnail.endsWith( "thumbnail.jpg" ) ) {
		    	img.category.thumbnail = uploadedFile.thumbnail_url;
		    	img.category.save();
		    }
		    
		    return ok(Json.toJson( result ));
		  } else {
		    flash("error", "Missing file");
		    return badRequest( ControllersUtils.getErrorMessage( "Missing file!" ) );
		  }
	}
}
