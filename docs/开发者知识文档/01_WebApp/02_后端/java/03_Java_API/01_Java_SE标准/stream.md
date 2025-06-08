
## flatMap

```java

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FlatMapExample {
    public static void main(String[] args) {
        // 创建一个包含多个列表的列表
        List<List<String>> listOfLists = Arrays.asList(
            Arrays.asList("a", "b", "c"),
            Arrays.asList("d", "e", "f"),
            Arrays.asList("g", "h", "i")
        );

        // 使用 flatMap 将所有内部列表合并为一个流
        List<String> flattenedList = listOfLists.stream()
            .flatMap(List::stream) // 将每个内部列表转换为流
            .collect(Collectors.toList()); // 收集结果到一个列表中

        // 输出结果
        System.out.println("原始列表: " + listOfLists);
        System.out.println("扁平化后的列表: " + flattenedList);
    }
}
```
