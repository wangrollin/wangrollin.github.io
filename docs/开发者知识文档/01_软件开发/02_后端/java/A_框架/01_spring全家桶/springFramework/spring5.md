
## 网站

[Spring官网](https://spring.io/)

- [主要特性：reactive](https://spring.io/reactive)
- [主要特性：event-driven](https://spring.io/event-driven)
- [主要特性：cloud](https://spring.io/cloud)
- [主要特性：web-applications](https://spring.io/web-applications)
- [主要特性：serverless](https://spring.io/serverless)
- [主要特性：batch](https://spring.io/batch)
- [主要特性：microservices](https://spring.io/microservices)


[Spring Framework Documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/)

- [主要模块的文档：Overview](https://docs.spring.io/spring/docs/current/spring-framework-reference/overview.html#overview)
- [主要模块的文档：Core](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#spring-core)
- [主要模块的文档：Testing](https://docs.spring.io/spring/docs/current/spring-framework-reference/testing.html#testing)
- [主要模块的文档：Data Access](https://docs.spring.io/spring/docs/current/spring-framework-reference/data-access.html#spring-data-tier)
- [主要模块的文档：Web Servlet](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#spring-web)
- [主要模块的文档：Web Reactive](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-webflux)
- [主要模块的文档：Integration](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#spring-integration)
- [主要模块的文档：Languages](https://docs.spring.io/spring/docs/current/spring-framework-reference/languages.html#languages)


## 使用指南

#### 监听服务启动

```java
implements ApplicationListener<ApplicationReadyEvent>
```


#### @Scheduled

> cron表达式 定时任务注解

https://blog.csdn.net/qq_39101581/article/details/79308851

> springboot Scheduled默认单线程

https://blog.csdn.net/NokeNoke/article/details/81362257
https://segmentfault.com/a/1190000021559640


#### @Async

方法异步，调用方和被调用方不能在同一个类里


## Q&A

> Caused by: org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'messageDispatcher': Bean with name 'messageDispatcher' has been injected into other beans [miniAppServiceBean] in its raw version as part of a circular reference, but has eventually been wrapped. This means that said other beans do not use the final version of the bean. This is often the result of over-eager type matching - consider using 'getBeanNamesOfType' with the 'allowEagerInit' flag turned off, for example.

https://blog.csdn.net/Jas000/article/details/78106804

问题出现的原因：简单的讲就是在启动程序的时候，Spring已经对DealerService里的asyncUpdate、userService加载完成，当准备创建AsyncUpdate类的时候发现使用了@Async注解，即spring又需将该Bean代理一次，然后Spring发现该Bean已经被其他对象注入，这里就是问题的关键所在了。

@Lazy

@Autowired








