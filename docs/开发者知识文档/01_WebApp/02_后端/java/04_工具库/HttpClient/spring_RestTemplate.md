

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```


```java
import org.springframework.web.client.RestTemplate;
```


RestTemplate不会做异常处理，会直接抛错，要继承handler，替换掉默认的handler，处理response之类的还挺复杂

