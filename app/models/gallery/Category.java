package models.gallery;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

import models.User;
import play.Logger;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

@Entity 
@Table(name="gallerycats")
public class Category extends Model {

    @Id
    public Long id;
    
    @Constraints.Required
    @Formats.NonEmpty
    public String title;
    
    public String description;
    
    public String thumbnail;
    
    @Formats.DateTime(pattern="MM/dd/yy")
    public Date create_date;
    
    @JsonIgnore
    @ManyToOne
    public User user;
    
    public Long parentid;
    
    public static Model.Finder<Long,Category> find = new Model.Finder(Long.class, Category.class);
    
    public static List<Category> findByUserCatId(Long user, Long parentId) {
    	Logger.info( "UserId: " + User.findAll().size() );
    	Logger.info( "parentId: " + Category.find.all().size() );
        return Category.find.where()
            .eq("user.id", user)
            .eq("parentId", parentId)
            .findList();
    }
    
    public static List<Category> findByCatId(Long parentId) {
    	Logger.info( "UserId: " + User.findAll().size() );
    	Logger.info( "parentId: " + Category.find.all().size() );
        return Category.find.where()
            .eq("parentId", parentId)
            .findList();
    }
    
    public static List<Category> findAllParent(Long id) {
    	List<Category> parents = new ArrayList<Category>();
    	findParent( parents, id );
    	return parents;
    }
    
    public static void findParent(List<Category> parents, Long parentId) {
    	Category parent = Category.find.where().eq("id", parentId).findUnique();
    	if ( parent == null || parent.id == 0 ) {
    		return;
    	}
    	parents.add( 0, parent );
    	findParent( parents, parent.parentid );
    }
}
