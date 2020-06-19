import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

public class SidebarGenerator {

    private static final String prefix = "* ";

    public static void main(String[] args) throws FileNotFoundException {

        String basePath = System.getProperty("user.dir");

        String[] paths = {basePath + "/docs/开发者知识文档", 
                            basePath + "/docs/开发小组成员", 
                            basePath + "/docs/BigDemo项目文档"};

        for (String path : paths) {

            File rootDir = new File(path);

            File sidebarFile = new File(path + "/_sidebar.md");

            try (FileOutputStream stream = new FileOutputStream(sidebarFile, false)) {

                print(rootDir, "", stream);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static void print(File dir, String indent, FileOutputStream stream) throws IOException {

        /**
         * 按照文件名进行字典序排序
         */
        File[] fileArr = dir.listFiles();
        Arrays.sort(fileArr, Comparator.comparing(File::getName));

        for (File fileOrDir : fileArr) {

            if (fileOrDir.isFile() && fileOrDir.getName().contains("DS_Store")
                    || fileOrDir.isDirectory() && fileOrDir.getName().contains(".assets")
                    || fileOrDir.isFile() && "_sidebar.md".equals(fileOrDir.getName())) {
                continue;
            }

            if (fileOrDir.isDirectory()) {
                stream.write((indent + prefix + fileOrDir.getName().substring(fileOrDir.getName().indexOf("_") + 1)
                        + System.lineSeparator()).getBytes());
                print(fileOrDir, indent + "    ", stream);
            } else {
                stream.write((indent + prefix + "["
                        + fileOrDir.getName().substring(fileOrDir.getName().indexOf("_") + 1,
                        fileOrDir.getName().indexOf(".md"))
                        + "](" + fileOrDir.getAbsolutePath().substring(fileOrDir.getPath().indexOf("/docs")) + ")"
                        + System.lineSeparator()).getBytes());
            }
        }
    }
}