
## pom依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.73</version>
</dependency>
```

## 常用方法

```java
XxxData dataObj = JSONObject.parseObject("object string", XxxData.class);

String str = JSONObject.toJSONString(new XxxData());

JSON.toJSONString(object.toJSONString(), SerializerFeature.PrettyFormat)
```

```java

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

String jsonString = "{\"1\": 100, \"2\": 200, \"3\": 300}"; // 输入的 JSON 字符串
Map<Long, Long> map = JSON.parseObject(jsonString, new TypeReference<Map<Long, Long>>() {});

```


## 保留 obj 中的 null 值

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.serializer.SerializerFeature;

public class Main {
    public static void main(String[] args) {
        MyClass myObj = new MyClass();
        System.out.println(JSON.toJsonString(myObj, SerializerFeature.WriteMapNullValue));
    }
}

class MyClass {
    private String name;
}

JSONWriter.Feature.WriteMapNullValue
