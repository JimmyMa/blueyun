package models;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;

import javax.persistence.Id;
import javax.persistence.Transient;

import play.Logger;
import play.db.ebean.Model;
import plugins.S3Plugin;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

public class S3File extends Model {

    @Id
    public Long id;

    private String bucket;

    public String name;

    @Transient
    public File file;

    public String getUrl() {
        return "https://s3.amazonaws.com/" + bucket + "/" + getActualFileName();
    }

    private String getActualFileName() {
        return id + "/" + name;
    }

    @Override
    public void save() {
        if (S3Plugin.amazonS3 == null) {
            Logger.error("Could not save because amazonS3 was null");
            throw new RuntimeException("Could not save");
        }
        else {
            this.bucket = S3Plugin.s3Bucket;
            
            id ++;
            
//            super.save(); // assigns an id

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, getActualFileName(), file);
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead); // public for all
            S3Plugin.amazonS3.putObject(putObjectRequest); // upload file
        }
    }

    @Override
    public void delete() {
        if (S3Plugin.amazonS3 == null) {
            Logger.error("Could not delete because amazonS3 was null");
            throw new RuntimeException("Could not delete");
        }
        else {
            S3Plugin.amazonS3.deleteObject(bucket, getActualFileName());
            super.delete();
        }
    }
}
