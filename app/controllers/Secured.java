package controllers;

import play.*;
import play.mvc.*;
import play.mvc.Http.*;

import models.*;

public class Secured extends Security.Authenticator {
    
    @Override
    public String getUsername(Context ctx) {
        return ctx.session().get("userid");
    }
    
    public static boolean isLogin() {
    	return Context.current().session().get("userid") != null;
    }
    
    public static boolean isLogin(Long userId) {
//    	Logger.info("getUserId11: " + userId + ": " +  getUserId() + ":" + (getUserId().equals( userId ) ) );
    	return ( userId.equals( getUserId() )  );
    }
    
    public static Long getUserId() {
//    	Logger.info("getUserId: " + Context.current().session().get("userid") );
    	if ( !isLogin() ) {
    		return new Long(0);
    	}
    	return Long.parseLong( Context.current().session().get("userid") );
    }
    
    public static void login(User user) {
    	Context.current().session().put("userid", String.valueOf( user.id ) );
    }
    
    

    
}