import java.util.List;
import java.util.Map;

import models.User;
import play.Application;
import play.GlobalSettings;
import play.Logger;
import play.libs.Yaml;
import plugins.S3Plugin;

import com.avaje.ebean.Ebean;

public class Global extends GlobalSettings {
    
    public void onStart(Application app) {
        InitialData.insert(app); 
        Logger.info( "Root: " + System.getProperty("user.dir") );
    } 
    
    static class InitialData {
        
        public static void insert(Application app) {
            if(Ebean.find(User.class).findRowCount() == 0) {
                
                Map<String,List<Object>> all = (Map<String,List<Object>>)Yaml.load("initial-data.yml");

                // Insert users first
                Ebean.save(all.get("users"));
                
                Ebean.save(all.get("categories"));
                
                Ebean.save(all.get("images"));
               
            }
        }
        
    }
    
}