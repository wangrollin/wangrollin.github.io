
```java

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class WriteToFileUsingBufferedWriter {
    public static void main(String[] args) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"));
            writer.write("这是使用 BufferedWriter 写入的内容。");
            writer.newLine(); // 写入换行符
            writer.write("另一行内容。");
            writer.close();
            System.out.println("写入成功！");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```
