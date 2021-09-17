
## spring注解

### @Async

异步执行，可以指定线程池，否则会自己去找Executor或者TaskExecutor执行


## tips

> 自己调自己，不走aop代理

```java
// 方法1
private DemoService getAopService() {
    return applicationContext.getBean(this.getClass());
}
```