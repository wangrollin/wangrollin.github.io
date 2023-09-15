
## tips

### 每次拿 bean 都重新生成一份 bean 的方法

如果您希望在每次调用svc1的方法时都刷新为新的实例，可以使用原型作用域（Prototype）和方法注入的方式。

使用原型作用域确保每次请求都会创建一个新的实例，而方法注入允许在每次调用方法时重新注入新的实例。

下面是使用原型作用域和方法注入实现该需求的示例：

```java
@Service
@Scope("prototype")
public class MyService {
    // ...
}

@Component
public class MyComponent {
    private final ApplicationContext applicationContext;

    @Autowired
    public MyComponent(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public void invokeServiceMethod() {
        MyService myService = applicationContext.getBean(MyService.class);
        // 调用myService的方法
    }
}
```

在上述示例中，MyService被声明为原型作用域（@Scope("prototype")），这意味着每次通过applicationContext.getBean(MyService.class)获取实例时都会创建一个新的实例。

MyComponent通过构造函数注入ApplicationContext，然后在invokeServiceMethod()方法中调用applicationContext.getBean(MyService.class)来获取最新的MyService实例，从而保证每次调用invokeServiceMethod()时都使用新的实例。

请注意，由于每次调用都会创建一个新的实例，这可能会对性能产生一定的影响。因此，请确保在需要频繁刷新实例的情况下使用此方法，并根据实际需求进行评估。