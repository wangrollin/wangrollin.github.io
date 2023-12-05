# AWS for Developers: Deploying Your Application to the Cloud



## 1.CodeCommit

### Introduction and setup

<img src="Deploy_an_App_to_the_Cloud.assets/image-20200102143357551.png" alt="image-20200102143357551" style="zoom: 67%;" />



![image-20200102144159545](Deploy_an_App_to_the_Cloud.assets/image-20200102144159545.png)



开始之前确保自己的权限是可以的，有codeCommit的完整权限

在windows上操作

![image-20200102144607087](Deploy_an_App_to_the_Cloud.assets/image-20200102144607087.png)



创建repo，只需要名字和描述

![image-20200102144829219](Deploy_an_App_to_the_Cloud.assets/image-20200102144829219.png)



创建成功

![image-20200102145206415](Deploy_an_App_to_the_Cloud.assets/image-20200102145206415.png)



### Checking in source code

![image-20200102150659680](Deploy_an_App_to_the_Cloud.assets/image-20200102150659680.png)



git clone

git add .

git commit -m "initial commit"

git push

![image-20200102150952188](Deploy_an_App_to_the_Cloud.assets/image-20200102150952188.png)



可以看到提交记录

![image-20200102151052467](Deploy_an_App_to_the_Cloud.assets/image-20200102151052467.png)



### CodeCommit key points

用IAM用户账号来access repo是最佳实践

一般来说，当在master分支上有新的commit的时候，触发部署任务

最好用PR，这样别人可以review代码

AWS考试不会考非AWS的技术，如git

<img src="Deploy_an_App_to_the_Cloud.assets/image-20200102151308402.png" alt="image-20200102151308402" style="zoom:67%;" />



<img src="Deploy_an_App_to_the_Cloud.assets/image-20200102151459282.png" alt="image-20200102151459282" style="zoom:67%;" />



## 2.CodeBuild

### CodeBuild concepts

<img src="Deploy_an_App_to_the_Cloud.assets/image-20200102152037353.png" alt="image-20200102152037353" style="zoom:67%;" />



![image-20200102152447448](Deploy_an_App_to_the_Cloud.assets/image-20200102152447448.png)



在用的时候才会创建build server，用完就销毁，只需要为server工作时间付钱



个性化配置build环境

生成什么样的文件 jar war

存在哪里

<img src="Deploy_an_App_to_the_Cloud.assets/image-20200102153017232.png" alt="image-20200102153017232" style="zoom:67%;" />



### buildspec.yml

![image-20200102153255138](Deploy_an_App_to_the_Cloud.assets/image-20200102153255138.png)



### Building your code

![image-20200102153753909](Deploy_an_App_to_the_Cloud.assets/image-20200102153753909.png)



名字、描述、source provider（github、codeCommit）、repo name、选择生成的文件存放位置

&&

![image-20200102154245997](Deploy_an_App_to_the_Cloud.assets/image-20200102154245997.png)



点击构建、可以重写部分选项、点击开始

![image-20200102154629619](Deploy_an_App_to_the_Cloud.assets/image-20200102154629619.png)



构建成功

![image-20200102154911698](Deploy_an_App_to_the_Cloud.assets/image-20200102154911698.png)



## 3.CodeDeploy

### CodeDeploy concepts

![image-20200102155222244](Deploy_an_App_to_the_Cloud.assets/image-20200102155222244.png)



![image-20200102155615444](Deploy_an_App_to_the_Cloud.assets/image-20200102155615444.png)



![image-20200102155719831](Deploy_an_App_to_the_Cloud.assets/image-20200102155719831.png)



app spec file

![image-20200102160040378](Deploy_an_App_to_the_Cloud.assets/image-20200102160040378.png)



### Deploying your code

在service里找到code deploy，创建app

![image-20200102160530263](Deploy_an_App_to_the_Cloud.assets/image-20200102160530263.png)



输入：app的名字、运行的平台（lambda or EC2）

EC2/lambda

![image-20200102160654199](Deploy_an_App_to_the_Cloud.assets/image-20200102160654199.png)



设置app的部署服务器集群

deployment group是将要部署的服务器集群

点击创建：name、in-place or blue/green 策略

![image-20200102160835234](Deploy_an_App_to_the_Cloud.assets/image-20200102160835234.png)



部署哪里的文件（如S3）、到哪个deployment group

![image-20200102161510998](Deploy_an_App_to_the_Cloud.assets/image-20200102161510998.png)



![image-20200102161807675](Deploy_an_App_to_the_Cloud.assets/image-20200102161807675.png)



**在这里停顿**

在自己的机器上执行命令

sudo apt-get update

sudo apt-get isntall ruby

sudo wget http.....(codeDeploy agent)

chmod +x ./install

sudo ./install auto



在服务器上的这个agent会去访问S3 repo里的文件，所以保证要有权限



点击创建，之后会自动执行

![image-20200102162540194](Deploy_an_App_to_the_Cloud.assets/image-20200102162540194.png)



## 4.CodePipeline

### CodePipeline concepts

![image-20200102163649798](Deploy_an_App_to_the_Cloud.assets/image-20200102163649798.png)



### Deploying code changes

![image-20200102164644454](Deploy_an_App_to_the_Cloud.assets/image-20200102164644454.png)



source provider(code commit、S3、github)、哪个repo、哪个branch

build provider(code build、jenkins)、build project

deploy provider(code deploy)、app name、deployment group

重要：不需要为deploy选择revision，因为直接从上一阶段的output拿过来了

![image-20200102164759418](Deploy_an_App_to_the_Cloud.assets/image-20200102164759418.png)



![image-20200102170621108](Deploy_an_App_to_the_Cloud.assets/image-20200102170621108.png)



## 5.Elastic Beanstalk

### Elastic Beanstalk concepts

<img src="Deploy_an_App_to_the_Cloud.assets/image-20200102171330426.png" alt="image-20200102171330426" style="zoom:80%;" />



### Creating an Elastic Beanstalk application

![image-20200102172849010](Deploy_an_App_to_the_Cloud.assets/image-20200102172849010.png)



如果要修改环境，只能删掉重新创建

![image-20200102172929114](Deploy_an_App_to_the_Cloud.assets/image-20200102172929114.png)



创建完成

![image-20200102173230559](Deploy_an_App_to_the_Cloud.assets/image-20200102173230559.png)



### Using CodePipeline to deploy your application

下面整合elastic beanstalk和code pipeline

![image-20200102173508084](Deploy_an_App_to_the_Cloud.assets/image-20200102173508084.png)



![image-20200102173531067](Deploy_an_App_to_the_Cloud.assets/image-20200102173531067.png)



![image-20200102173614200](Deploy_an_App_to_the_Cloud.assets/image-20200102173614200.png)



![image-20200102173855893](Deploy_an_App_to_the_Cloud.assets/image-20200102173855893.png)



![image-20200102173918029](Deploy_an_App_to_the_Cloud.assets/image-20200102173918029.png)



![image-20200102174313371](Deploy_an_App_to_the_Cloud.assets/image-20200102174313371.png)



![image-20200102174406319](Deploy_an_App_to_the_Cloud.assets/image-20200102174406319.png)



![image-20200102174447504](Deploy_an_App_to_the_Cloud.assets/image-20200102174447504.png)



![image-20200102174530150](Deploy_an_App_to_the_Cloud.assets/image-20200102174530150.png)



### Elastic Beanstalk key points

![image-20200102174719589](Deploy_an_App_to_the_Cloud.assets/image-20200102174719589.png)



用beanstalk，如果停止了env，那么相关的db也会停止



## Conclusion

### Next steps

![image-20200103091229535](Deploy_an_App_to_the_Cloud.assets/image-20200103091229535.png)



