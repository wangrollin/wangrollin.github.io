# AWS基础知识



## Introduction && AWS Console

### Certified Developer-Associate

​	有教程培训、有AWS开发者认证资格



## Security

### Identity and Access Management(IAM)

​	一个交互界面

![image-20191231100423329](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231100423329.png)

### Roles and Policies

​	permission用一个json表示（s3的读取权限）

​	policy中有多个permission（s3的读取权限、db的读写权限）

​    role中有多个policy

### Users and Groups

​	group中有多个policy

### Cognito

cognito 拉丁语：察觉

![image-20191231101733911](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231095907205.png)

![image-20191231101733911](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231101733911.png)

​	认证、登录：可以用内部的账号来本地认证，外部的账号来第三方认证

### User pools

​	可以在AWS控制台上创建一个user pool

![image-20191231101401406](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231101401406.png)

### Identity pools

![image-20191231102130668](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231102130668.png)



![image-20191231102251053](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231102251053.png)



![image-20191231102359915](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231102359915.png)



![image-20191231102427326](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231102427326.png)



![image-20191231102531800](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231102531800.png)



![image-20191231102728814](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231102728814.png)



![image-20191231102843303](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231102843303.png)



### Identity Provider(IdP)

![image-20191231103052492](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231103052492.png)



![image-20191231103215041](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231103215041.png)





<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231103512745.png" alt="image-20191231103512745" style="zoom:50%;" />

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231103630527.png" alt="image-20191231103630527" style="zoom:50%;" />





### Web identity federation(WIF)

openid

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231103921998.png" alt="image-20191231103921998" style="zoom:50%;" />



![image-20191231104216225](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231104216225.png)



<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231104721409.png" alt="image-20191231104721409" style="zoom:50%;" />



## Development

### SDK and tools

![image-20191231105743535](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231105743535.png)



![image-20191231105844396](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231105844396.png)



### Simple Storage Service(S3)

![image-20191231110341475](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231110341475.png)



![image-20191231134535639](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231134535639.png)



![image-20191231134811089](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231134811089.png)



<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231134911175.png" alt="image-20191231134911175"  />



### DynamoDB

![image-20191231135044286](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231135044286.png)



![image-20191231135150935](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231135150935.png)



![image-20191231135328743](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231135328743.png)



### Lambda

![image-20191231135727662](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231135727662.png)



![image-20191231135845128](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231135845128.png)



![image-20191231135954672](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231135954672.png)



![image-20191231140110743](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231140110743.png)



![image-20191231140137150](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231140137150.png)



![image-20191231140410895](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231140410895.png)



![image-20191231140558416](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231140558416.png)



![image-20191231140715310](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231140715310.png)



## Messaging and Event Driven

### Simple Queue Service(SQS)

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231141243972.png" alt="image-20191231141243972" style="zoom:50%;" />



<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231141415730.png" alt="image-20191231141415730" style="zoom:50%;" />



![image-20191231141648378](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231141648378.png)



![image-20191231141737270](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231141737270.png)



![image-20191231141813700](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231141813700.png)



![image-20191231141952094](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231141952094.png)



![image-20191231143050973](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231143050973.png)



![image-20191231143147534](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231143147534.png)



<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231143233404.png" alt="image-20191231143233404" style="zoom: 67%;" />



<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231143320143.png" alt="image-20191231143320143"  />



![image-20191231143418067](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231143418067.png)



![image-20191231144316061](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231144316061.png)



### Simple Notification Service(SNS)

SNS把消息推给订阅者

SQS存储消息，直到有服务来处理消息

![image-20191231144837402](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231144837402.png)



![image-20191231144641952](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231144641952.png)



SNS创建完topic之后，SQS来订阅该topic

这样SNS push一条消息，SQS收到，触发lambda trigger，执行lambda

![image-20191231145049244](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231145049244.png)



![image-20191231145427778](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231145427778.png)



### Events and Lambda

在SQS里为lambda设置trigger（之前是在lambda里设置SQS trigger）

![image-20191231145840516](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231145840516.png)



在SNS里可以设置订阅者（之前是在SQS里订阅SNS）

![image-20191231145949547](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231145949547.png)



把lambda的role赋予DynamoDB的读取权限后，在DynamoDB里为lambda设置trigger，trigger中batch设为2，表示批量发送2个

![image-20191231150759861](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231150759861.png)



再添加item，就会触发lambda的trigger

![image-20191231151024945](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231151024945.png)



### Step Functions

step functions的基本概念是建立在tasks和state machines之上的

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231151603937.png" alt="image-20191231151603937" style="zoom:50%;" />



<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231151649501.png" alt="image-20191231151649501" style="zoom:50%;" />



step functions的应用场景如下

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231151802188.png" alt="image-20191231151802188" style="zoom:50%;" />



从services进入step functions

![image-20191231151902895](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231151902895.png)



点击get started

![image-20191231152116802](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231152116802.png)



创建一个state machine

![image-20191231152159285](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231152159285-1577777812704.png)



![image-20191231165156767](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231165156767.png)



拷贝了一个sample project的state machine definition，修改了其中的lambda ARN，指向之前创建的那个lambda，然后创建这个state machine

![image-20191231165226686](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231165226686.png)



准备执行state machine

![image-20191231165536775](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231165536775.png)



填写好启动参数之后，启动state machine，开始执行，等待了5s之后，触发lambda

![image-20191231165621439](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231165621439.png)



## Deployment, Scalability, and Monitoring

### Elastic Beanstalk

​	自动创建EC2（elastic compute cloud），运行linux或者windows server

​	security group：EC2 security configuration for port 80 http ingress only（needs VPC and doesn't create it）

​	auto scaling group:configured to replace an instance if terminated or unavaliable

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231172125342.png" alt="image-20191231172125342" style="zoom:50%;" />



​	how to use it, three steps:

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231172231603.png" alt="image-20191231172231603" style="zoom:50%;" />



进入到elastic beanstalk，点击开始

![image-20191231172318778](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231172318778.png)



创建一个app，并部署，这时候很多东西都创建了出来，包括S3（存放上传上去的app的代码）

![image-20191231172504110](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231172504110.png)



创建好之后，可以在环境里看到各种信息

![image-20191231172701253](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231172701253.png)



从环境界面回到应用界面，可以选择一个版本并部署到环境里去，可以回滚

![image-20191231172959070](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231172959070.png)



### CloudFormation

​	创建elastic beanstalk的时候，也自动创建了一个cloud formation stack，用来配置和维护系统

![image-20191231173545202](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231173545202.png)



cloud formation界面显示各个item

![image-20191231173637094](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231173637094.png)



可以点进去看到某个item的具体信息

![image-20191231173713134](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231173713134.png)



可以在cloud formation界面查看和编辑某个item的信息（json、yaml、脑图）

![image-20191231173812968](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231173812968.png)



![image-20191231173929187](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231173929187.png)



还能把左侧的资源类型直接拖进来，参与脑图

![image-20191231173908102](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231173908102.png)



### ElastiCache

进入elasticCache的主页，点击开始

![image-20191231174418725](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231174418725.png)



创建，使用memcached作为集群引擎，设置cache名字，设置node type，并设置subnet，安全组选择之前elastic beanstalk自动创建的安全组

![image-20191231174601251](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231174601251.png)



创建成功

![image-20191231174815085](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231174815085.png)



创建一个新的lambda，内部的代码使用上传的代码；并将elasticCache的endpoint填入代码中，设置VPC，安全组选择之前elastic beanstalk自动创建的安全组



查看VPC中的security groups，在被elastic beanstalk创建的时候，只开放了80端口，所以lambda去访问elastic cache的时候会无法访问端口（非80）

![image-20191231175639766](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20191231175639766.png)



开始测试lambda，存键值对到cache，然后取出来，再打印，成功



### CloudFront

本质上就是CDN

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102134658140.png" alt="image-20200102134658140" style="zoom:50%;" />



<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102134753231.png" alt="image-20200102134753231" style="zoom:50%;" />



在S3里上传一个文件

![image-20200102134950312](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102134950312.png)



那么在这个链接里就能访问到

![image-20200102135043137](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135043137.png)



在service里找到cloudfront

![image-20200102135135554](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135135554.png)



创建一个

![image-20200102135225263](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135225263.png)



选择web类型的

![image-20200102135301878](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135301878.png)



origin domain name选择 S3 的domain

![image-20200102135508717](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135508717.png)



price class选择CDN到U.S. Canada Europe

![image-20200102135419100](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135419100.png)



生成之后有一个属性叫domain name

![image-20200102135600709](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135600709.png)



利用这个domain name加上文件名字即可访问

![image-20200102135642707](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102135642707.png)



### CloudWatch

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102140219715.png" alt="image-20200102140219715" style="zoom: 50%;" />

cloudwatch alarm

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102140318784.png" alt="image-20200102140318784" style="zoom:50%;" />



从service找到cloudwatch，点进去

![image-20200102140434666](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102140434666.png)



创建一个alarm

![image-20200102141130074](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102141130074.png)



选择billing类型

![image-20200102141304189](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102141304189.png)



名字，描述，alarm条件，通知方式

![image-20200102141529138](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102141529138.png)



报警了

![image-20200102141729027](AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102141729027.png)



## Conclusion

### Cleanup

<img src="AWS%E4%BA%91%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.assets/image-20200102142216946.png" alt="image-20200102142216946" style="zoom:50%;" />



delete

action -> delete

disable -> delete

否则会扣钱











