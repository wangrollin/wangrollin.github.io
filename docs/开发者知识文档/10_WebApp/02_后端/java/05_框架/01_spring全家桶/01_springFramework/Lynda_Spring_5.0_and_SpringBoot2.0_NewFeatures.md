## Spring 5.0 and Spring Boot 2.0 New Features

**Introduction**

- New features of Spring and Spring Boot
- What you need to know

**1. Spring Core Changes**

- Java baseline

    spring5最低的jdk是java8、java ee1.7

    spring5.1将支持java11

    

- Removed packages and classes

    升级到了hibernate5

    删掉了 velocity

    删掉了 XMLBeans

    删掉了 Guava

    

- IO

    改成非阻塞的了

    增加了 isFile() 方法

    readable channel -- nio

    general file system access --nio

    

- XML configuration

- Nullable annotation

    @Nullable @NonNullApi

    

**2. Spring Web Changes**

- Servlets

    全面支持 servlet3.1

    有了pushbuilder，要求servlet4.0 tomcat9；可以减少加载时间，对于电商是很好的

    

- Immutable binding

    帮助保护对象，比如dto

    

- JSON and Protobuf

    升级 jackson 3.9, protobuf 3

    

- Exception and response status

    exceptionhandler 可以添加一个redirect了

    ResponseStatusException @ResponseStatus

    

- Reactive spring

    Reactor3.1 Flux Mono

    RxJava3.1 2.1

    

    webclient 非阻塞的流，淘汰了AsyncRestTemplate

    

    spring-webflux vs spring-mvc

    @webflux-controller

    支持undertow netty

    webflux.fn

    

**3. Spring Test Changes**

- Jupiter support

    全面支持Jupiter

    junit5

    不支持@RunWith，支持@ExtendsWith

    SpringExtension.class

    

    springJUnitConfig

    @ExtendsWith(SpringExtension.class) ->Jupiter

    @ContextConfiguration -> Spring

    

    springJUnitWebConfig

    springJUnitConfig + WebApplicationContext

    

    conditional running

    @EnabledIf @DisabledIf

    

- Parallel test execution

    Jupiter5.3 是并行测试的一个试验

    plugin surefire

    

- Mocks

**4. Spring Boot**

- Library upgrades

    最低jdk8

    最低spring5

    tomcat升级到8.5

    flyway5

    hibernate5.2

    thymeleaf3

    

- Configuration property changes

- Actuator changes

- Micrometer

- Other changes

**Conclusion**

- Next steps
