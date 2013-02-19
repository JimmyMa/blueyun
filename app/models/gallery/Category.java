package models.gallery;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import models.User;

import org.codehaus.jackson.annotate.JsonIgnore;

import play.Logger;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.avaje.ebean.ExpressionList;
import com.blueyun.common.Constants;

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
    
    public int status;
    
    @Formats.DateTime(pattern="MM/dd/yy")
    public Date create_date;
    
    @JsonIgnore
    @ManyToOne
    public User user;
    
    public Long parentid;
    
    public static Model.Finder<Long,Category> find = new Model.Finder(Long.class, Category.class);
    
    public static List<Category> findByUserCatId(Long user, Long parentId, int status) {
    	Logger.info( "UserId: " + User.findAll().size() );
    	Logger.info( "parentId: " + Category.find.all().size() );
    	ExpressionList<Category> expr = Category.find.where()
            .eq("user.id", user)
            .eq("parentId", parentId);
    	if ( status != Constants.ALL ) {
    		expr = expr.eq( "status", status );
    	}
    	
    	return expr.orderBy( "id desc"  ).findList();
    }
    
    public static List<Category> findChildrenByParentId(Long parentId, int status) {
//    	Logger.info( "UserId: " + User.findAll().size() );
//    	Logger.info( "parentId: " + Category.find.all().size() );
    	ExpressionList<Category> expr =  Category.find.where()
            .eq("parentId", parentId);
    	if ( status != Constants.ALL ) {
    		expr = expr.eq( "status", status );
    	}
            
        return expr.orderBy( "id desc"  ).findList();
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
    
    public static void updateThumbWithParents(Category category, String thumbnail_url) {
	    if ( category.thumbnail == null || category.thumbnail.endsWith( "thumbnail.jpg" ) ) {
	    	category.thumbnail = thumbnail_url;
	    	category.save();
	    }

	    if ( category.parentid != 0 ) { 
	    	Category parent = Category.find.where().eq("id", category.parentid).findUnique();
	    	updateThumbWithParents(parent, thumbnail_url);
	    }
    }
    
}
