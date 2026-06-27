在 Spring 中，你可以使用@Value注解结合 SpEL（Spring Expression Language）来将配置文件中的属性导入为Map变量。以下是实现步骤：

1. 配置文件
假设你的配置文件application.yml内容如下：
yaml
auth:
  aa:
    ak: xxx
    sk: xxx
  bb:
    ak: xxx
    sk: xxx

## 方法1

### 创建一个 Java 类来接收配置

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.HashMap;
import java.util.Map;

@Configuration
@PropertySource("classpath:application.yml")
public class AuthConfig {

    @Value("#{${auth}}")
    private Map<String, Map<String, String>> authMap;

    public Map<String, Map<String, String>> getAuthMap() {
        return authMap;
    }
}
```

### 解释

@Configuration：表明这是一个配置类。
@PropertySource("classpath:application.yml")：指定要加载的配置文件。
@Value("#{${auth}}")：使用 SpEL 表达式将auth属性解析为Map。这里的#{}表示 SpEL 表达式，${auth}表示从配置文件中获取auth属性的值。

### 使用配置

在其他组件中，你可以通过依赖注入来使用这个配置：
java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class SomeComponent {

    @Autowired
    private AuthConfig authConfig;

    public void doSomething() {
        Map<String, Map<String, String>> authMap = authConfig.getAuthMap();
        // 在这里使用authMap
        for (String key : authMap.keySet()) {
            Map<String, String> subMap = authMap.get(key);
            System.out.println("Key: " + key + ", AK: " + subMap.get("ak") + ", SK: " + subMap.get("sk"));
        }
    }
}

## 方法2

另一种方式：使用@ConfigurationProperties
除了@Value注解，你还可以使用@ConfigurationProperties注解来更方便地绑定配置属性。

### 创建配置类

```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "auth")
public class AuthConfigProperties {

    private Map<String, Map<String, String>> authMap = new HashMap<>();

    public Map<String, Map<String, String>> getAuthMap() {
        return authMap;
    }

    public void setAuthMap(Map<String, Map<String, String>> authMap) {
        this.authMap = authMap;
    }
}
```

### 使用配置

在其他组件中，通过依赖注入使用：

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class SomeComponent {

    @Autowired
    private AuthConfigProperties authConfigProperties;

    public void doSomething() {
        Map<String, Map<String, String>> authMap = authConfigProperties.getAuthMap();
        // 在这里使用authMap
        for (String key : authMap.keySet()) {
            Map<String, String> subMap = authMap.get(key);
            System.out.println("Key: " + key + ", AK: " + subMap.get("ak") + ", SK: " + subMap.get("sk"));
        }
    }
}
```

这种方式更加简洁和类型安全，推荐使用@ConfigurationProperties来处理复杂的配置属性绑定。
