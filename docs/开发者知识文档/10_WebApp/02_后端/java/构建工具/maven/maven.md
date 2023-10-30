
## 网站

- [官网](https://maven.apache.org/index.html)


## 检查jar class 冲突

三种方法

mvn dependency:tree -Dmaven.test.skip=true
maven helper
grep 'javax.servlet.ServletContext' -r lib
-XX:+TraceClassLoading

## 最近常用的maven命令

### -T

在 Maven 中，`-T` 参数用于指定并行构建的级别。它允许您在构建项目时并行执行多个模块的构建任务，以提高构建速度。

`-T` 参数后面可以跟着一个级别值，表示并行构建的级别。常用的级别值包括：

- `1C`：表示串行构建，即不并行执行构建任务。
- `C`：表示以多线程方式构建模块，但每个模块的构建任务是串行执行的。
- `N`：表示以多线程方式构建模块，并行执行 N 个模块的构建任务。

例如，如果您有一个包含多个模块的 Maven 项目，并且想要以并行方式构建这些模块，可以使用 `-T` 参数来指定并行级别。例如，`-T 4` 表示同时构建 4 个模块的构建任务。

请注意，`-T` 参数的实际效果可能受到项目的结构、依赖关系和硬件资源的限制影响。在设置并行级别时，需要根据项目的特点和硬件配置进行适当的调整，以避免资源竞争和性能问题。

更多关于 Maven 并行构建的信息可以参考 Maven 官方文档中的并行构建部分：[https://maven.apache.org/guides/mini/guide-parallel-builds.html ↗](https://maven.apache.org/guides/mini/guide-parallel-builds.html)


### 其他

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

mvn dependency:tree
mvn dependency:tree -Dmaven.test.skip=true
mvn dependency:tree -Dincludes=java-redis-client
mvn dependency:tree -Dincludes=dorado-common

-am 编译依赖的项 auto make

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


## scope

### runtime（默认）

### provided


## 执行阶段命令




## Q&A tips

### 报错 Malformed \uxxxx encoding

添加 -X 参数，最后一行就是有问题的jar，删掉重新构建

mvn clean install -X


### 其他

> 让plugin 继承

<inherited>true</inherited>

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

> jar包冲突

[Maven中 jar包冲突原理与解决办法](https://blog.csdn.net/noaman_wgs/article/details/81137893)

