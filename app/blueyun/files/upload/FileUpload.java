package blueyun.files.upload;

import java.io.File;
import java.io.IOException;

import controllers.common.Util;

public class FileUpload {
	
	static String RootFolder = "D:/Projects/Mine/MyTodo/BlueYun/public/imgs/users/";

	public static FileUploadResult uploadFile( File file, String fileName, String contentType, long userid ) throws IOException {
		
		File newFolder = new File( RootFolder + userid );
		Util.copyFile(file, newFolder, fileName);
		String thumnailName = Util.createThumbnail( new File(newFolder, fileName ), new File( RootFolder + userid ), contentType );
		
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
