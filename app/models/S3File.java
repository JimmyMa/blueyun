package models;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.persistence.Transient;

import play.Logger;
import play.db.ebean.Model;
import plugins.S3Plugin;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

import controllers.common.Util;

public class S3File {

	static String RootFolder = "D:/Projects/Mine/MyTodo/BlueYun/public/imgs/users/";
	
    public Long id = UUID.randomUUID().getMostSignificantBits();

    private static String bucket = S3Plugin.s3Bucket;

    public String name;
    
    public Long userId;

    public File file;

    public String getUrl() {
    	if (S3Plugin.amazonS3 == null) {
    		return "/assets/imgs/users/" + userId + "/" + id + "/" + name;
    	} else {
    		return "https://s3.amazonaws.com/" + bucket + "/" + getActualFileName();
    	}
    }

    private String getActualFileName() {
        return userId + "/" + id + "/" + name;
    }

    public void save() {

        if (S3Plugin.amazonS3 == null) {
            try {
				Util.copyFile(file, new File( RootFolder + userId + "/" + id + "/" ) , name );
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        else {
            this.bucket = S3Plugin.s3Bucket;

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, getActualFileName(), file);
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead); // public for all
            S3Plugin.amazonS3.putObject(putObjectRequest); // upload file
        }
    }

    public static void delete(String url) {
        if (S3Plugin.amazonS3 == null) {
            Logger.error("Could not delete because amazonS3 was null");
        }
        else {
            S3Plugin.amazonS3.deleteObject(bucket, url.substring( url.indexOf( bucket ) + bucket.length() + 1 ) );
        }
    }
}
