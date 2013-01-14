package models.writer;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity 
public class Project {
    @Id
    public Long id;
    
    public String name;

}
