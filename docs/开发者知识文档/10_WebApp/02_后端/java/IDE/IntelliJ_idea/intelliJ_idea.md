# intelliJ_idea

## opensource 开源项目免费授权

https://www.jetbrains.com/community/opensource/


## 插件

- statistics
- free mybatis plugin
- snakeYaml plugin
- alibaba cloud toolkit
- alibaba Java coding guidelines
- sonarLint
- maven helper
- lombok
- markdown
- ideavim
- shellcheck
- database navigat
- junit
- bashsupport
- go template
- javafx runtime for plugin
- thrift support
- arthas idea
- docker
- kubernetes (by idea)


## 配置

### 普通配置

- tab limit 设置为 100
- front 设置为15
- Font: Menlo
- show tabs in one row: false
- view - appearance - toolbar
- Theme: macOS light
- editor - color scheme - general - background: C7EDCC（浅绿色）

git commit 开启 diff 窗口： 
version control -> commit 
  -> use ono-modal commit interface: false
  -> clear initial commit message: true

开启 ide settings 同步

快捷键：
- 删除：quick switch scheme
- 添加：open in terminal [ctl + `]
- 添加：reveal in finder [opt + `]

### 添加jdk并设置为新项目的默认选项

比如 /usr/local/Cellar/openjdk@11/11.0.7+10/libexec/openjdk.jdk

这样sourcepath会有东西，可以看见`java api的注释文档`


### 在idea中打开多个maven项目

File->Project Structure…->Modules可以添加Modules

https://jordanzheng.github.io/open-multi-module-in-one-project-for-idea/


### 配置java doc

打开 project structure，点击 SDKs，点击Document Path，点击从互联网添加

添加https://docs.oracle.com/en/java/javase/11/docs/api

apply

遇到一个不会的类，点击shift + f1，即可跳转到网页上的doc


## 问题和解决方案 problems

> 查看jar包源码

如果是maven的依赖，自动就能看到，但是如果是独立的jar，就看不到。把jar包 add as Library，然后就能看啦


> maven reimport 一直报错，修改如下

Go to File > Settings > Build,Execution,Deployment> Build Tools > Maven > Importing .

Change VM options for importer to -Didea.maven3.use.compat.resolver


> 生成java doc -encoding utf-8 -charset utf-8

![image-20191230152300145](intelliJ_idea.assets/image-20191230152300145.png)

![image-20191230152311418](intelliJ_idea.assets/image-20191230152311418.png)


> 运行spring boot，如果命令行启动，需要编辑一下，如果maven启动，勾选profile

![image-20191230152327067](intelliJ_idea.assets/image-20191230152327067.png)

![image-20191230152336052](intelliJ_idea.assets/image-20191230152336052.png)

![image-20191230152349614](intelliJ_idea.assets/image-20191230152349614.png)

> 运行两个service实例

在configure里勾选 allow parallel run，改改server port

> IDEA运行报Command line is too long

```
修改项目下 .idea\workspace.xml，找到标签 <component name="PropertiesComponent">
在标签里加一行  <property name="dynamic.classpath" value="true" />
```

> 在shell用mvn编译正常，IDEA一直报错

可能别人把`.idea`和`.iml`的文件提交了，删掉再来即可

> IDEA点击Download sources 报错：Caused by: java.rmi.ConnectException: Connection refused to host: 127.0.0.1

删除对应 project 目录的 .idea文件夹，重启idea，reload maven，重新点击 Download sources
