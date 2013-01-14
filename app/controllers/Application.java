package controllers;

import models.User;

import org.codehaus.jackson.JsonNode;

import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import controllers.common.ControllersUtils;

public class Application extends Controller {


	public static Result addUser() {
		JsonNode json = request().body().asJson();
		User User = Json.fromJson(json, User.class);
		Logger.info( "Json111:" + User );
        Logger.info( "email: " + User.email );
        Logger.info( "password: " + User.password );
		User.save();
        return ok( Json.toJson(User));


	}
}
