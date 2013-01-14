package controllers.common;

import org.codehaus.jackson.JsonNode;

import play.libs.Json;

public class ControllersUtils {
	
	private final static String FAILURE = "failure";
	private final static String SUCCESS = "success";

	public static JsonNode getErrorMessage( String message ) {
		ErrorMessage msg = new ErrorMessage();
		msg.status = FAILURE;
		msg.message = message;
		return Json.toJson( msg );
	}
	
	public static JsonNode getSuccessMessage( String message ) {
		SuccessMessage msg = new SuccessMessage();
		msg.status = SUCCESS;
		msg.message = message;
		return Json.toJson( msg );
	}
}
