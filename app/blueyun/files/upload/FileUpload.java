package blueyun.files.upload;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import models.S3File;
import plugins.S3Plugin;
import controllers.common.Util;

public class FileUpload {
	
	public static S3Plugin plugin = new S3Plugin(null);
	
//	static String RootFolder = "D:/Projects/Mine/MyTodo/BlueYun/public/imgs/users/";
	static String RootFolder = "/tmp/imgs/users/";

	public static FileUploadResult uploadFile( File file, String fileName, String contentType, long userid ) throws IOException {
		FileUploadResult result = new  FileUploadResult();
		UploadedFile uploadedFile = new UploadedFile();

		File targetFolder = new File( RootFolder + userid );
		
        BufferedImage im = ImageIO.read(file);
        
		File targetFile = Util.scaleImage( im, fileName, targetFolder, contentType, 1000 );
		if ( targetFile != null ) {
			S3File s3File = new S3File();
			s3File.file = targetFile;
			s3File.name = fileName;
			s3File.save();
			uploadedFile.url = s3File.getUrl();
			uploadedFile.size = targetFile.length();
		}

		targetFile = Util.scaleImage( im, fileName, targetFolder, contentType, 250 );
		if ( targetFile != null ) {
			S3File s3File = new S3File();
			s3File.file = targetFile;
			s3File.name = fileName;
			s3File.save();
			uploadedFile.thumbnail_url = s3File.getUrl();
		}

		
		
		uploadedFile.name = fileName;
		uploadedFile.delete_url = "delete";
		uploadedFile.delete_type = "DELETE";
		result.files.add(uploadedFile);
		
		return result;
	}
}
