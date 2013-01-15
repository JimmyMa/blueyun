package models.gallery;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import models.User;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

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
    
    @ManyToOne
    public Category category;
    
    @ManyToOne
    public User user;
    
    public static Model.Finder<Long,Image> find = new Model.Finder(Long.class, Image.class);
    
    public static List<Image> findByCatId(Long category) {
        return Image.find.where()
                .eq("category.id", category)
                .findList();
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
