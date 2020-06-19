

#### maven

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.11.0</version>
</dependency>
```





## 代码

### 【bean的代码】

#### 忽略某些字段

```java
@JsonIgnore
```



#### 让某些字段变成key的时候，首字母大写

```java
@JsonProperty(value = "Type")
```



#### 忽略某些值为null的字段

```java
@JsonInclude(JsonInclude.Include.NON_EMPTY)
```



### 【mapper的代码】

```java
ObjectMapper oMapper = new ObjectMapper();
Map<String, Object> map = oMapper.convertValue(carousel, Map.class);
```