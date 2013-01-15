package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

/**
 * User entity managed by Ebean
 */
@Entity 
@Table(name="account")
public class User extends Model {

    @Id
    public Long id;
    
    @Formats.NonEmpty
    public String email;
    
    @Constraints.Required
    public String name;
    
    @JsonIgnore
    @Constraints.Required
    public String password;
    
    // -- Queries
    
    public static Model.Finder<Long,User> find = new Model.Finder(Long.class, User.class);
    
    /**
     * Retrieve all users.
     */
    public static List<User> findAll() {
        return find.all();
    }

    /**
     * Retrieve a User from email.
     */
    public static User findByEmail(String email) {
        return find.where().eq("email", email).findUnique();
    }
    
    /**
     * Authenticate a User.
     */
    public static User authenticate(String email, String password) {
        return find.where()
            .eq("email", email)
            .eq("password", password)
            .findUnique();
    }
    
    // --
    
    public String toString() {
        return "User(" + email + ")";
    }

}

