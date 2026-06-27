# springcloud

Spring-cloud-starter-gateway 和 spring-boot-starter-web 有冲突，不能再同一个pom里，否则会报 at least one candidate autowired



Spring-cloud-starter-gateway

http://www.ityouknow.com/springcloud/2018/12/12/spring-cloud-gateway-start.html



# 微服务架构：Spring-Cloud

## 总结

![](springcloud.assets/pic-20200708-165029.png)

spring cloud 把各个组件相互配合起来， 整合成一套成熟的微服务架构体系
其中， 由eureka做服务注册与发现，很好的把各个服务链接起来
ribbon+fegin提供了微服务的调用和负载均衡解决方案
hystrix 负责监控微服务之间的调用情况，以及降级和熔断保护
Hystrix dashboard监控Hystrix的熔断情况以及监控信息以图形化界面展示
spring cloud config 提供了统一的配置中心服务
所有外来的请求由zuul统一进行路由和转发，起到了API网关的作用
Sleuth+Zipkin把我们微服务的追踪数据记录下来并展示方便我们进行后续分析

## 什么是微服务？

 微服务就是把原本臃肿的一个项目的所有模块拆分开来并做到互相没有关联，甚至可以不使用同一个数据库。  比如：项目里面有User模块和Power模块，但是User模块和Power模块并没有直接关系，仅仅只是一些数据需要交互，那么就可以吧这2个模块单独分开来，当user需要调用power的时候，power是一个服务方，但是power需要调用user的时候，user又是服务方了， 所以，他们并不在乎谁是服务方谁是调用方，他们都是2个独立的服务，这时候，微服务的概念就出来了。

## 经典问题:微服务和分布式的区别

 谈到区别，我们先简单说一下分布式是什么，所谓分布式，就是将偌大的系统划分为多个模块（这一点和微服务很像）部署到不同机器上（因为一台机器可能承受不了这么大的压力或者说一台非常好的服务器的成本可能够好几台普通的了），各个模块通过接口进行数据交互，其实 分布式也是一种微服务。 因为都是吧模块拆分开来变为独立的单元，提供接口来调用，那么 他们本质的区别在哪呢？ 他们的区别主要体现在“目标”上， 何为目标，就是你这样架构项目要做到的事情。 分布式的目标是什么？ 我们刚刚也看见了， 就是一台机器承受不了的，或者是成本问题 ， 不得不使用多台机器来完成服务的部署， 而微服务的目标 只是让各个模块拆分开来，不会被互相影响，比如模块的升级亦或是出现BUG等等... 

讲了这么多，可以用一句话来理解：分布式也是微服务的一种，而微服务他可以是在一台机器上。

 

## 微服务与Spring-Cloud的关系（区别）

 微服务只是一种项目的架构方式，或者说是一种概念，就如同我们的MVC架构一样， 那么Spring-Cloud便是对这种技术的实现。

## 微服务一定要使用Spring-Cloud吗？

  我们刚刚说过，微服务只是一种项目的架构方式，如果你足够了解微服务是什么概念你就会知道，其实微服务就算不借助任何技术也能实现，只是有很多问题需要我们解决罢了例如：负载均衡，服务的注册与发现，服务调用，路由。。。。等等等等一系列问题，所以,Spring-Cloud 就出来了，Spring-Cloud将处理这些问题的的技术全部打包好了，就类似那种开袋即食的感觉。。 

 

# Spring-Cloud项目的搭建

 因为spring-cloud是基于spring-boot项目来的，所以我们项目得是一个spring-boot项目，至于spring-boot项目，这节我们先不讨论，这里要注意的一个点是spring-cloud的版本与spring-boot的版本要对应下图：

![](springcloud.assets/pic-20200708-135045.png)

在我这里我的版本是这样的

spring-boot：

```maven
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.2.RELEASE</version>
    </parent>
```

spring-cloud：

```maven
  <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Finchley.SR2</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```



当你项目里面有这些依赖之后，你的spring cloud项目已经搭建好了(初次下载spring-cloud可能需要一点时间)