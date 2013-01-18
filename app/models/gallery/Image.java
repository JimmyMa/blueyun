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

import com.avaje.ebean.PagingList;

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
    
    @JsonIgnore
    @ManyToOne
    public Category category;
    
    @JsonIgnore
    @ManyToOne
    public User user;
    
    public static Model.Finder<Long,Image> find = new Model.Finder(Long.class, Image.class);
    
    public static PagingResult<Image> findByCatId(Long category, int pageNum) {
    	PagingResult<Image> results = new PagingResult<Image>();
    	PagingList<Image> pagingList;
    	if ( category == -1 ) {
    		pagingList = Image.find.findPagingList( 20 );
    	} else {
    		pagingList = Image.find.where()
                    .eq("category.id", category)
                    .findPagingList( 20 );
    	}
    	results.elements = pagingList.getPage( pageNum - 1 ).getList();
    	results.currentPage = pageNum;
    	results.totolPages = pagingList.getTotalPageCount();
    	
    	return results;
    }
    
    public static List<Image> findByCatId(Long category, Long userId) {
    	if ( category == -1 ) {
            return Image.find.where()
                    .eq("user.id", userId)
                    .findList();
    	} else {
            return Image.find.where()
                    .eq("category.id", category)
                    .findList();
    	}
    }
}
