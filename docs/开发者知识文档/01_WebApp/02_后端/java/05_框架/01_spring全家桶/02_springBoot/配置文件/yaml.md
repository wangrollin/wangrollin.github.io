
## 复杂格式的使用

@ConfigurationProperties 读取yaml文件中的配置映射到 java 对象中

```java
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private Map<String, Integer> idMap;

    public Map<String, Integer> getIdMap() {
        return idMap;
    }

    public void setIdMap(Map<String, Integer> idMap) {
        this.idMap = idMap;
    }
}
```


```java
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(AppConfig.class)
public class AppConfigConfiguration {
    // 配置类的其他内容...
}
```

```yaml
app:
  id_map:
    key1: 1
    key2: 2
    key3: 3
```

### key 中特殊字符如何处理

用 [] 包起来即可

[${date}]
