## 最近常用的maven命令

```bash
mvn clean install -Dmaven.test.skip=true -Dcheckstyle.skip=true -Dmaven.javadoc.skip=true -U

mvn clean install -Dmaven.test.skip=true -Dcheckstyle.skip=true -Dmaven.javadoc.skip=true

mvn clean package -Pprod dockerfile:build -Dmaven.test.skip=true -Dcheckstyle.skip=true -Dmaven.javadoc.skip=true

mvn -Pprod verify jib:dockerBuild -Dmaven.test.skip=true -Dcheckstyle.skip=true -Dmaven.javadoc.skip=true

# 常用
mvn clean install -Dmaven.test.skip=true
mvn clean install -DskipTests=true

# 查看 pmd 检查结果
mvn clean install pmd:check -Dmaven.test.skip=true
mvn clean install pmd:check -DskipTests=true

不编译，不运行：-Dmaven.test.skip=true

编译，不运行：-DskipTests=true


mvn clean deploy -DskipTests=true

mvn clean package -P docker -DskipTests=true  -Dmaven.javadoc.skip=true

mvn clean install -DskipTests=true  -Dcheckstyle.skip=true -Dmaven.javadoc.skip=true

mvnw.cmd -Pprod verify jib:dockerBuild -DskipTests=true

mvn -Pprod verify jib:dockerBuild -DskipTests=true -Dcheckstyle.skip=true -Dmaven.javadoc.skip=true

mvn -Pprod clean verify jib:build -DskipTests=true

mvn initialize sonar:sonar -Dsonar.login=deployment -Dsonar.password=xxx


mvn sonar:sonar \
 -Dsonar.host.url=http://example.com:9000 \
 -Dsonar.login=xxxxxxxxxxxxxxxxxxxxxxx

```

maven 3.6.1版本有bug，尽量不要使用



## maven插件

enforce



## Q&A tips

> MAVEN: was cached in the local repository, resolution will not be reattempted until the update interval of nexus-snapshot has elapsed or updates are forced

参数加上 -U


> 报错：Exception in thread "main" java.lang.AssertionError

https://stackoverflow.com/questions/46878649/maven-compilation-issue-with-java-9

Just add this

```
<forceJavacCompilerUse>true</forceJavacCompilerUse>
```

to your maven compiler build plugin in your POM and you'll see all the javac errors! [Source with more details](https://issues.apache.org/jira/browse/MCOMPILER-346)


> < opentinal>true< /optional>

则这个jar只被自己引用，不会传递下去


> <sources>

这个标签会覆盖父pom中的source配置


> dependencies vs dependencyManagement

dependencies：

就算在子项目中不写该依赖项，那么子项目仍然会从父项目中继承该依赖项（全部继承）

dependencyManagement：

只是声明依赖，并不实现引入，因此子项目需要显示声明需要用的依赖。如果不在子项目中声明依赖，是不会从父项目中继承下来的；只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项，并且version和scope都读取自父pom;另外如果子项目中指定了版本号，那么会使用子项目中指定的jar版本。


> 打包为pom

用来管理依赖，如果不是pom不是父子关系，那么如何能使用他们的dependencies和dependencyManagement呢，靠的就是打成pom工程，然后依赖上就可以了


> 父子工程 vs 聚合工程