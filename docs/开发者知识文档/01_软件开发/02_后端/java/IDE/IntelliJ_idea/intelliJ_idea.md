# intelliJ_idea

## 插件大全

​	snakeYaml plugin

​	lombok

​	maven helper

​	docker

​	alibaba cloud toolkit

​	alibaba Java coding guidelines

​	sonarLint


## 在idea中打开多个maven项目

File->Project Structure…->Modules可以添加Modules

https://jordanzheng.github.io/open-multi-module-in-one-project-for-idea/


## 配置java doc

打开 project structure，点击 SDKs，点击Document Path，点击从互联网添加

添加https://docs.oracle.com/en/java/javase/11/docs/api

apply

遇到一个不会的类，点击shift + f1，即可跳转到网页上的doc





maven reimport 一直报错，修改如下

Go to File > Settings > Build,Execution,Deployment> Build Tools > Maven > Importing .

Change VM options for importer to -Didea.maven3.use.compat.resolver



生成java doc -encoding utf-8 -charset utf-8

![image-20191230152300145](intelliJ_idea.assets/image-20191230152300145.png)



![image-20191230152311418](intelliJ_idea.assets/image-20191230152311418.png)



运行spring boot，如果命令行启动，需要编辑一下，如果maven启动，勾选profile

![image-20191230152327067](intelliJ_idea.assets/image-20191230152327067.png)

![image-20191230152336052](intelliJ_idea.assets/image-20191230152336052.png)

![image-20191230152349614](intelliJ_idea.assets/image-20191230152349614.png)

