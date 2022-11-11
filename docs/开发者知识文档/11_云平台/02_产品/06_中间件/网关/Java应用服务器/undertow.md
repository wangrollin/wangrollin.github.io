## 替换默认的Tomcat

Spring boot 默认使用 **Tomcat** 内嵌容器 。依赖于 `spring-boot-starter-web` 。我们只需要排除 **Tomcat** 依赖。引用**Undertow** 就可以了，`maven` 配置如下：

```xml
  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
   </dependency>
   <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-undertow</artifactId>
    </dependency>
```