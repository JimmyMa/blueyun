import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "BlueYun"
    val appVersion      = "1.0-SNAPSHOT"

    val appDependencies = Seq(
      "com.amazonaws" % "aws-java-sdk" % "1.3.11",
      "postgresql" % "postgresql" % "9.1-901-1.jdbc4"
    )

	val gzippableAssets = SettingKey[PathFinder]("gzippable-assets", "Defines the files to gzip")
	val gzipAssets = TaskKey[Seq[File]]("gzip-assets", "gzip all assets")
	lazy val gzipAssetsSetting = gzipAssets <<= gzipAssetsTask dependsOn (copyResources in Compile)
	lazy val gzipAssetsTask = (gzippableAssets, streams) map {
	  case (finder: PathFinder, s: TaskStreams) => {
	    var count = 0
	    var files = finder.get.map { file =>
	      val gzTarget = new File(file.getAbsolutePath + ".gz")
	      IO.gzip(file, gzTarget)
	      count += 1;
	      gzTarget
	    }
	    s.log.info("Compressed " + count + " asset(s)")
	    files
	  }
	}
	
	val main = PlayProject(appName, appVersion, appDependencies, mainLang = JAVA).settings(
	    gzippableAssets <<= (classDirectory in Compile)(dir => (dir ** ("*.js" || "*.css" || "*.html"))),
	    gzipAssetsSetting,
	    playPackageEverything <<= playPackageEverything dependsOn gzipAssets
	)
}


