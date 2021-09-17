



IDE插件



maven插件

```xml
<plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.0</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <encoding>${project.build.sourceEncoding}</encoding>
                    <compilerArguments>
                        <extdirs>src\main\webapp\WEB-INF\lib</extdirs>
                    </compilerArguments>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>1.18.8</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
```

## tips

> Gson反序列化 和 builder模式 都会忽略设置了值的字段，统一用类型的默认值

```java
@Builder
public static class Clazz1 {

    private boolean bool = true;
    private String f1 = "f1";
    private String f2;
}

@Test
public void test() {

    Clazz1 c1 = Clazz1.builder().f2("f2").build();
    System.out.println(new Gson().toJson(c1)); // {"bool":false,"f2":"f2"}
}
```


