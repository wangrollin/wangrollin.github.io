

## Lynda课程：Spring: Test-Driven Development with JUnit

对应代码已上传到github



### 1 Review of TDD and Application

##### why TDD matters

快速的设计验证

单元测试是可执行的文档

在测试全部代码之前测试部分代码

代码变动管理，理解了目前的测试用例，然后再修改代码

TDD是高等级技巧



##### introducing the sample application



### 2 Testing Spring Service Cpmponents

##### test planning for @Service components

集成测试：测试单元之间的配合

单元测试：测试单元内部功能



##### write integration tests for @Service

测试 service， repository， database for test

```java
@RunWith(SpringRunner.class) //声明使用junit
@SpringBootTest(webEnvironment = WebEnvironment.NONE) // 声明是spring boot项目，且不加载@controller的东西
```



##### write unit tests for @Service

```java
@RunWith(MockitoJUnitRunner.class) //Mockito
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
```



### 3 Testing Spring Controllers

##### test planning for @Controller components

MVC类型的controller

restful类型的controller



##### write integration tests for @Controller

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
```



##### write unit tests for @Controller

```java
@RunWith(SpringRunner.class)
@WebMvcTest(ContactsManagementController.class)
```



### 4 Testing Spring Data Access Components

##### test planning for @Repository components

基本没有unit test的必要，因为大部分的工作都是框架做的，除非override一些方法



##### write integration tests for @Repository

```java
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
```

连上数据库后，存储了，测试结束会自动rollback，DB保持整洁



@DataJpaTest带进来了很多注解：

- @AutoConfigureDataJpa：引入了JPA测试需要的所有依赖
- @AutoConfigureTestDatabase：可以使用嵌入的，可以使用外部的，可以使用yaml中配置好的datasource
- @AutoConfigureTestEntityManager：允许直接操作EntityManager
- @Transactional：允许测试结束后回滚操作，让测试用例可重复运行



##### create integration test datasets

DBUnit 是 Junit的一个扩展

```java
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
    DirtiesContextTestExecutionListener.class,
   TransactionalTestExecutionListener.class,
    DbUnitTestExecutionListener.class })
@DatabaseSetup("classpath:test-datasets.xml")
```



### 5 Creating Test Suites: Putting It All Together

##### make a feature test suite

smoke tests

iteration suite

feature suite

```java
@RunWith(Suite.class)
@Suite.SuiteClasses ({ContactsManagementServiceIntegrationTest.class, ContactsManagementControllerIntegrationTest.class, CustomerContactRepositoryIntegrationTest.class})
```



##### make a continuous integration test suite

系统基本的流程，外部系统健康检测



### Conclusion

##### next steps





















