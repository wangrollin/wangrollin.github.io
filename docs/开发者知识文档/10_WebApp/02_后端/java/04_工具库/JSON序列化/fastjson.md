
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