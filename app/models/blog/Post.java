package models.blog;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import models.User;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import play.data.format.Formats;
import play.db.ebean.Model;

import com.blueyun.common.CustomDateSerializer;

@Entity 
@Table(name="blogpost")
public class Post extends Model {
	
	@Id
    public Long id;
    
    public String title;
    public String content;
    
    public String tags;
    
    @Formats.DateTime(pattern="MM/dd/yy")
    @JsonSerialize(using = CustomDateSerializer.class)
    public Date create_date;
    
    public int status;
    
    public int comments;
    
    public int shared;
    
    public String thumbnail;
    
    @Transient
    transient public String[] tagsList;
    
    @JsonIgnore
    @ManyToOne
    public User user;
    
    public static Model.Finder<Long,Post> find = new Model.Finder(Long.class, Post.class);
    
    @Override
	public void save() {
		if ( content.contains( "<img src=\"" ) ) {
//			Logger.info( "content:" + content );
			int start = content.indexOf("<img src=\"" ) + 10;
			int end = content.indexOf( "\"", start );
//			Logger.info( "start:" + start + " end:" + end );
			thumbnail = content.substring( start, end );
		}
		super.save();
	}
    
    @Override
	public void update() {
		if ( content.contains( "<img src=\"" ) ) {
//			Logger.info( "content:" + content );
			int start = content.indexOf("<img src=\"" ) + 10;
			int end = content.indexOf( "\"", start );
//			Logger.info( "start:" + start + " end:" + end );
			thumbnail = content.substring( start, end );
		}
		super.save();
	}
}
