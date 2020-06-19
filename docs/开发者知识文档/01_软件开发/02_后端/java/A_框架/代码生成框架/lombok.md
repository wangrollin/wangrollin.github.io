



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