

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>build-helper-maven-plugin</artifactId>
    <version>1.10</version>
    <executions>
        <execution>
            <id>timestamp-property</id>
            <goals>
                <goal>timestamp-property</goal>
            </goals>
            <configuration>
                <name>build.time</name>
                <pattern>yyyyMMdd-HHmmss</pattern>
                <timeZone>GMT+8</timeZone>
            </configuration>
        </execution>
    </executions>
</plugin>
```