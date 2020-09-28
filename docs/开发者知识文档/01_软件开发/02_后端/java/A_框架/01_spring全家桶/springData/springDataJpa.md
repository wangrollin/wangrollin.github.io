

## 官网

https://spring.io/projects/spring-data-jpa#overview



## Accessing Data with JPA

快速上手

https://spring.io/guides/gs/accessing-data-jpa/



## Spring Data JPA - Reference Documentation

官方文档

https://docs.spring.io/spring-data/jpa/docs/2.3.0.RELEASE/reference/html/#reference



主要功能：

- 自动生成数据库表

- 自动生成接口实现



决定绑定哪一个spring data的实现

- 通过看继承的接口，JpaRepository<T, ID>
- 通过看entity的注解，@Entity
- 通过basepackage，如下：

```java
@EnableJpaRepositories(basePackages = "com.acme.repositories.jpa")
@EnableMongoRepositories(basePackages = "com.acme.repositories.mongo")
class Configuration { … }
```



**Query creation from method names**

```java
interface PersonRepository extends Repository<Person, Long> {

  List<Person> findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname);

  // Enables the distinct flag for the query
  List<Person> findDistinctPeopleByLastnameOrFirstname(String lastname, String firstname);
  List<Person> findPeopleDistinctByLastnameOrFirstname(String lastname, String firstname);

  // Enabling ignoring case for an individual property
  List<Person> findByLastnameIgnoreCase(String lastname);
  // Enabling ignoring case for all suitable properties
  List<Person> findByLastnameAndFirstnameAllIgnoreCase(String lastname, String firstname);

  // Enabling static ORDER BY for a query
  List<Person> findByLastnameOrderByFirstnameAsc(String lastname);
  List<Person> findByLastnameOrderByFirstnameDesc(String lastname);
}
```



**nested property**

```java
List<Person> findByAddress_ZipCode(ZipCode zipCode);
```



**Defining sort expressions**

```java
Sort sort = Sort.by("firstname").ascending()
  .and(Sort.by("lastname").descending());
```



**Defining sort expressions using the type-safe API**

```java
TypedSort<Person> person = Sort.sort(Person.class);

TypedSort<Person> sort = person.by(Person::getFirstname).ascending()
  .and(person.by(Person::getLastname).descending());
```



**Defining sort expressions using the Querydsl API**

```java
QSort sort = QSort.by(QPerson.firstname.asc())
  .and(QSort.by(QPerson.lastname.desc()));
```



**Limiting the result size of a query with** `Top` **and** `First`

```java
User findFirstByOrderByLastnameAsc();

User findTopByOrderByAgeDesc();

Page<User> queryFirst10ByLastname(String lastname, Pageable pageable);

Slice<User> findTop3ByLastname(String lastname, Pageable pageable);

List<User> findFirst10ByLastname(String lastname, Sort sort);

List<User> findTop10ByLastname(String lastname, Pageable pageable);xxxxxxxxxx User findFirstByOrderByLastnameAsc();User findTopByOrderByAgeDesc();Page<User> queryFirst10ByLastname(String lastname, Pageable pageable);Slice<User> findTop3ByLastname(String lastname, Pageable pageable);List<User> findFirst10ByLastname(String lastname, Sort sort);List<User> findTop10ByLastname(String lastname, Pageable pageable);QSort sort = QSort.by(QPerson.firstname.asc())  .and(QSort.by(QPerson.lastname.desc()));java
```



**Example 23. Stream the result of a query with Java 8** `Stream<T>`

```java
@Query("select u from User u")
Stream<User> findAllByCustomQueryAndStream();

Stream<User> readAllByFirstnameNotNull();

@Query("select u from User u")
Stream<User> streamAllPaged(Pageable pageable);
```



**asynchronous querie**

```java
@Async
Future<User> findByFirstname(String firstname);               

@Async
CompletableFuture<User> findOneByFirstname(String firstname); 

@Async
ListenableFuture<User> findOneByLastname(String lastname); 
```



**Example 43. QuerydslPredicateExecutor interface**

```Java
public interface QuerydslPredicateExecutor<T> {

  Optional<T> findById(Predicate predicate);  

  Iterable<T> findAll(Predicate predicate);   

  long count(Predicate predicate);            

  boolean exists(Predicate predicate);        

  // … more functionality omitted.
}


interface UserRepository extends CrudRepository<User, Long>, QuerydslPredicateExecutor<User> {
}

Predicate predicate = user.firstname.equalsIgnoreCase("dave")
	.and(user.lastname.startsWithIgnoreCase("mathews"));

userRepository.findAll(predicate);
```



**Example 47. A Spring MVC controller using domain types in method signatures**

```java
@Controller
@RequestMapping("/users")
class UserController {

  @RequestMapping("/{id}")
  String showUserForm(@PathVariable("id") User user, Model model) {

    model.addAttribute("user", user);
    return "userForm";
  }
}
```









## problems

> detached entity passed to persist

A里面有B，C里也有B，所以

@OneToOne(cascade = {CascadeType.ALL})

@OneToOne(cascade = {CascadeType.MERGE})


> 只在创建表的时候生效，之后修改不再生效

@Column(length = 1023)


> TransactionRequiredException: Executing an update/delete query

Service层没有加@Transactional

JPA方法没有加@Modifying吧


> 只查询部分字段 

spring-data 的 projection

https://segmentfault.com/q/1010000016704304/a-1020000016765160

其他方法

https://www.cnblogs.com/hdwang/p/9599012.html


> 二级缓存配置

- [ehcacheb本地缓存](https://www.jianshu.com/p/0ca49d208c14)
- [redis](https://github.com/debop/hibernate-redis)

1.1) First-level cache

First-level cache always Associates with the Session object. Hibernate uses this cache by default. Here, it processes one transaction after another one, means wont process one transaction many times. Mainly it reduces the number of SQL queries it needs to generate within a given transaction. That is instead of updating after every modification done in the transaction, it updates the transaction only at the end of the transaction.

1.2) Second-level cache

Second-level cache always associates with the Session Factory object. While running the transactions, in between it loads the objects at the Session Factory level, so that those objects will be available to the entire application, not bound to single user. Since the objects are already loaded in the cache, whenever an object is returned by the query, at that time no need to go for a database transaction. In this way the second level cache works. Here we can use query level cache also.


> org.springframework.dao.InvalidDataAccessApiUsageException: Executing an update/delete query; nested exception is javax.persistence.TransactionRequiredException: Executing an update/delete query

Transactional 注解不生效：
- 自己调自己，不走代理，也就没有Transactional
- Transactional用在impl里，因为Transactional不会从接口里继承
