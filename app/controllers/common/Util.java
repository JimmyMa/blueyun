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
	
	public static String createThumbnail(BufferedImage im, String fileName, File folder, String mimetype) throws IOException {
		if ( !folder.exists() ) {
			folder.mkdirs();
		}
        if (im != null) {
            BufferedImage thumb = Scalr.resize(im, 250); 
            FileOutputStream os = new FileOutputStream(new File(folder, "tn_" + fileName ));
            if (mimetype.endsWith("png")) {
                ImageIO.write(thumb, "PNG" , os);
            } else if (mimetype.endsWith("jpeg")) {
                ImageIO.write(thumb, "jpg" , os);
            } else {
                ImageIO.write(thumb, "GIF" , os);
            }
            os.close();
            return "tn_" + fileName;
        }
        return null;
	}
	
	public static File scaleImage(BufferedImage im, String fileName, File folder, String mimetype, int wsize, int hsize) throws IOException {
		if ( !folder.exists() ) {
			folder.mkdirs();
		}
        if (im != null) {
        	File targetFile = new File(folder, fileName );
            BufferedImage thumb = Scalr.resize(im, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_WIDTH, wsize);
            int height = thumb.getHeight();
            if ( height > hsize ) {
            	int x1 = ( height - hsize ) / 2;
            	thumb = Scalr.crop(thumb, 0, x1, wsize, hsize );
            }
            FileOutputStream os = new FileOutputStream(targetFile);
            if (mimetype.endsWith("png")) {
                ImageIO.write(thumb, "PNG" , os);
            } else if (mimetype.endsWith("jpeg")) {
                ImageIO.write(thumb, "jpg" , os);
            } else {
                ImageIO.write(thumb, "GIF" , os);
            }
            os.close();
            return targetFile;
        }
        return null;
	}

}
