
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