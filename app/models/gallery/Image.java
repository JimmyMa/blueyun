package models.gallery;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

import models.User;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.avaje.ebean.ExpressionList;
import com.avaje.ebean.PagingList;
import com.blueyun.common.Constants;

import controllers.common.PagingResult;

@Entity 
@Table(name="galleryImage")
public class Image extends Model {

    @Id
    public Long id;
    
    public String title;
    public String description;
    
    @Constraints.Required
    public String location;
    
    public String thumbnail;
    
    public int status;
    
    @JsonIgnore
    @ManyToOne
    public Category category;
    
    @JsonIgnore
    @ManyToOne
    public User user;
    
    public static Model.Finder<Long,Image> find = new Model.Finder(Long.class, Image.class);
    
    public static PagingResult<Image> findPageByCatId(Long category, int pageNum, int status) {
    	PagingResult<Image> results = new PagingResult<Image>();
    	PagingList<Image> pagingList;
    	ExpressionList<Image> expr = null;
    	if ( category == -1 ) {
    		expr = Image.find.where();
    	} else {
    		expr = Image.find.where()
                    .eq("category.id", category);
    	}
    	if ( status != Constants.ALL ) {
    		expr = expr.eq( "status", status );
    	}
    	
    	pagingList = expr.findPagingList( 20 );
    	results.elements = pagingList.getPage( pageNum - 1 ).getList();
    	results.currentPage = pageNum;
    	results.totolPages = pagingList.getTotalPageCount();
    	
    	return results;
    }
    
    public static List<Image> findByCatId(Long category, Long userId, int status) {
    	ExpressionList<Image> expr = null;
    	if ( category == -1 ) {
    		expr = Image.find.where()
                    .eq("user.id", userId);
    	} else {
    		expr = Image.find.where()
                    .eq("category.id", category);
    	}
    	if ( status != Constants.ALL ) {
    		expr = expr.eq( "status", status );
    	}
    	return expr.findList();
    }
}
