
## tips

> 自己调自己，不走aop代理

```java
// 方法1
private DemoService getAopService() {
    return applicationContext.getBean(this.getClass());
}
```