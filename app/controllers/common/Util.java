package controllers.common;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;

public class Util {


	public static void copyFile(File source, File destinationDir, String newName) throws IOException {
		if (source.isFile()) {
			InputStream in = new FileInputStream(source);
			destinationDir.mkdirs();
			File destFile = new File(destinationDir, newName);
			OutputStream out = new FileOutputStream(destFile);

			byte[] buf = new byte[1024];
			int len;
			while ((len = in.read(buf)) > 0) {
				out.write(buf, 0, len);
			}
			in.close();
			out.close();
		} else {
			File[] children = source.listFiles();
			if (children == null)
				return;
			destinationDir = new File(destinationDir, source.getName());
			destinationDir.mkdirs();
			for (File child : children) {
				copyFile(child, destinationDir, newName);
			}
		}
	}
	
	public static String createThumbnail(File file, File folder, String mimetype) throws IOException {
		if ( !folder.exists() ) {
			folder.mkdirs();
		}
        BufferedImage im = ImageIO.read(file);
        if (im != null) {
            BufferedImage thumb = Scalr.resize(im, 250); 
            FileOutputStream os = new FileOutputStream(new File(folder, "tn_" + file.getName() ));
            if (mimetype.endsWith("png")) {
                ImageIO.write(thumb, "PNG" , os);
            } else if (mimetype.endsWith("jpeg")) {
                ImageIO.write(thumb, "jpg" , os);
            } else {
                ImageIO.write(thumb, "GIF" , os);
            }
            os.close();
            return "tn_" + file.getName();
        }
        return null;
	}

}
