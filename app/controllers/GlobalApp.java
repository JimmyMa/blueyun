package controllers;

import models.User;

import org.codehaus.jackson.JsonNode;

import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import controllers.common.ControllersUtils;
import views.html.index;

public class GlobalApp extends Controller {

	public static class Login {

		public String email;
		public String password;

	}

	/**
	 * Handle login form submission.
	 */
	public static Result authenticate() {
		JsonNode vendorJson = request().body().asJson();
		Login login = Json.fromJson(vendorJson, Login.class);
        User user = User.authenticate(login.email, login.password);
		if ( user == null) {
			Logger.info("User Login: " + login.email + ": P:" + login.password.trim());
            return badRequest( ControllersUtils.getErrorMessage( "username or password is not correct!" ) );
        } else {
        	Secured.login( user );
            return ok(Json.toJson( user ) );
        }

	}

	public static Result index() {
		return ok(index.render());
	}

//	public static Result javascriptRoutes() {
//		response().setContentType("text/javascript");
//		return ok(Routes.javascriptRouter("jsRoutes",
//
//				
//				controllers.routes.javascript.GlobalApp.authenticate()
//		// Routes for Writer
////				controllers.writer.routes.javascript.WriterApp.save()
//
//		));
//	}

}