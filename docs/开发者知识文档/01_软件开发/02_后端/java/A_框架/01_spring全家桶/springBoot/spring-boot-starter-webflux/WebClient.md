

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

```java
import org.springframework.web.reactive.client.WebClient;

```


## 博客

- [Spring WebClient vs. RestTemplate](https://www.baeldung.com/spring-webclient-resttemplate)
- [webFlux前世今生](https://www.cnblogs.com/lixinjie/p/a-brother-of-spring-mvc-is-spring-webflux.html)
- [Spring webflux-反应式编程入门](http://bbs.learnfuture.com/topic/5755)


## 重要的类

[WebClint方法文档](https://docs.spring.io/spring/docs/5.2.8.RELEASE/spring-framework-reference/web-reactive.html#webflux-client-retrieve)

```java
Mono<String> result =
    WebClient
        .create()
        .get()
        .uri("/persons/{id}")
        .accept(MediaType.APPLICATION_JSON)
        .exchange()
        .flatMap(response -> response.bodyToMono(String.class));

Mono<String> mono =
    WebClient
        .create()
        .post()
        .uri("https://www.google.com")
        .headers(httpHeaders -> httpHeaders.set("1", "1"))
        .bodyValue("123")
        .retrieve()
        .bodyToMono(String.class);

mono.subscribe(str -> {
    System.out.println("##");
    System.out.println(str);
    System.out.println("##");
});

```

[Mono Flux 方法大全](https://projectreactor.io/docs/core/release/reference/index.html#which-operator)

```java
Mono

Flux

```
