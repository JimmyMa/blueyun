package blueyun.files.upload;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import controllers.common.Util;

public class FileUpload {
	
//	static String RootFolder = "D:/Projects/Mine/MyTodo/BlueYun/public/imgs/users/";
	static String RootFolder = "/tmp/imgs/users/";

	public static FileUploadResult uploadFile( File file, String fileName, String contentType, long userid ) throws IOException {
		
		File targetFolder = new File( RootFolder + userid );
		
        BufferedImage im = ImageIO.read(file);
		String thumnailName = Util.createThumbnail( im, fileName, targetFolder, contentType );
		
		Util.scaleImage( im, fileName, targetFolder, contentType );
		
		FileUploadResult result = new  FileUploadResult();
		UploadedFile uploadedFile = new UploadedFile();
		
		uploadedFile.name = fileName;
		uploadedFile.size = file.length();
		uploadedFile.url =  "/assets/imgs/users/" + userid + "/" + fileName;
		uploadedFile.thumbnail_url = "/assets/imgs/users/" + userid + "/" + thumnailName;
		uploadedFile.delete_url = "delete_url/" + fileName;
		uploadedFile.delete_type = "DELETE";
		result.files.add(uploadedFile);
		
		return result;
	}
}
