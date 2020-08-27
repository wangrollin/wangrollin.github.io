
## 博客

- [caffeine使用方法](https://www.baeldung.com/spring-boot-caffeine-cache)
- [spring boot + caffeine 使用方法](https://www.baeldung.com/spring-boot-caffeine-cache)


## 使用方法

缓存和MAP最大的区别是：缓存会删除items；删除策略会严重影响命中率，命中率对于cache lib来说是非常关键的指标；caffeine使用 windows tinyLfu删除策略，可以提供接近最优的命中率

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-cache</artifactId>
    </dependency>
    <dependency>
        <groupId>com.github.ben-manes.caffeine</groupId>
        <artifactId>caffeine</artifactId>
    </dependency>
</dependencies>

```

```java
// 测试数据
class DataObject {
    private final String data;
 
    private static int objectCounter = 0;
    // standard constructors/getters
    
    public static DataObject get(String data) {
        objectCounter++;
        return new DataObject(data);
    }
}

```


### 填充cache

- 手动填充
- 同步加载
- 异步加载

#### 手动填充

初始化

```java
Cache<String, DataObject> cache = Caffeine.newBuilder()
  .expireAfterWrite(1, TimeUnit.MINUTES)
  .maximumSize(100)
  .build();

// 如果不存在，返回null
String key = "A";
DataObject dataObject = cache.getIfPresent(key);

// 手动放进去
cache.put(key, dataObject);
dataObject = cache.getIfPresent(key);

// get方法，如果不存在，会调用fallback来填充并返回数据
dataObject = cache
  .get(key, k -> DataObject.get("Data for A"));

// get方法是原子性的，也就是说即使很多个线程同时调用，也只会执行一次fallback，所以get优于getIfPresent
```


#### 同步加载

```java
// 接收一个function用来初始化value，就像手动填充的get一样
LoadingCache<String, DataObject> cache = Caffeine.newBuilder()
  .maximumSize(100)
  .expireAfterWrite(1, TimeUnit.MINUTES)
  .build(k -> DataObject.get("Data for " + k));

DataObject dataObject = cache.get(key);

Map<String, DataObject> dataObjectMap = cache.getAll(Arrays.asList("A", "B", "C"));
```

#### 异步加载

```java
// 和同步加载相似，但是是异步的，返回一个包含真实value的CompletableFuture
AsyncLoadingCache<String, DataObject> cache = Caffeine.newBuilder()
  .maximumSize(100)
  .expireAfterWrite(1, TimeUnit.MINUTES)
  .buildAsync(k -> DataObject.get("Data for " + k));

// get getAll
String key = "A";
 
cache.get(key).thenAccept(dataObject -> {
    assertNotNull(dataObject);
    assertEquals("Data for " + key, dataObject.getData());
});
 
cache.getAll(Arrays.asList("A", "B", "C"))
  .thenAccept(dataObjectMap -> assertEquals(3, dataObjectMap.size()));

```

### 驱逐value

#### 基于容量的驱逐

两种方法获取size:

- 对象计数
- 获取权重

```java
// 对象计数
LoadingCache<String, DataObject> cache = Caffeine.newBuilder()
  .maximumSize(1)
  .build(k -> DataObject.get("Data for " + k));

assertEquals(0, cache.estimatedSize());


cache.get("A");
assertEquals(1, cache.estimatedSize());

cache.get("B");
cache.cleanUp(); // 因为驱逐是异步执行的，cleanUp方法可以等待驱逐结束
assertEquals(1, cache.estimatedSize());


// 获取权重
LoadingCache<String, DataObject> cache = Caffeine.newBuilder()
  .maximumWeight(10)
  .weigher((k,v) -> 5)
  .build(k -> DataObject.get("Data for " + k));
 
assertEquals(0, cache.estimatedSize());
 
cache.get("A");
assertEquals(1, cache.estimatedSize());
 
cache.get("B");
assertEquals(2, cache.estimatedSize());

// value会被删除，当cache的权重超过10
cache.get("C");
cache.cleanUp();
assertEquals(2, cache.estimatedSize());

```


#### 基于时间的驱逐

三种类型：

- 访问之后失效：从上次读或写发生开始计算时间
- 写后失效：从上次读发生开始计算时间
- 定制策略：每个实体的过期时间被独立计算，通过实现Expiry


```java
// expire-after-access expireAfterAccess
LoadingCache<String, DataObject> cache = Caffeine.newBuilder()
  .expireAfterAccess(5, TimeUnit.MINUTES)
  .build(k -> DataObject.get("Data for " + k));


// expire-after-write expireAfterWrite
cache = Caffeine.newBuilder()
  .expireAfterWrite(10, TimeUnit.SECONDS)
  .weakKeys()
  .weakValues()
  .build(k -> DataObject.get("Data for " + k));


// custom policy
cache = Caffeine.newBuilder().expireAfter(new Expiry<String, DataObject>() {
    @Override
    public long expireAfterCreate(
      String key, DataObject value, long currentTime) {
        return value.getData().length() * 1000;
    }
    @Override
    public long expireAfterUpdate(
      String key, DataObject value, long currentTime, long currentDuration) {
        return currentDuration;
    }
    @Override
    public long expireAfterRead(
      String key, DataObject value, long currentTime, long currentDuration) {
        return currentDuration;
    }
}).build(k -> DataObject.get("Data for " + k));

```


#### 基于引用的驱逐

我们可以配置缓存，来对cache中的keys 和/或 values进行垃圾回收。为此，我们要为keys和values配置WeakRefence的使用。我们可以为只针对values的垃圾回收配置SoftReference。

WeakRefence的使用可以在没有任何强引用时时，执行对象的垃圾回收。

SoftReference允许对对象执行基于 JVM的全局Least-Recently-Used策略 的垃圾回收。


```java
// We should use Caffeine.weakKeys(), Caffeine.weakValues(), and Caffeine.softValues() to enable each option:
LoadingCache<String, DataObject> cache = Caffeine.newBuilder()
  .expireAfterWrite(10, TimeUnit.SECONDS)
  .weakKeys()
  .weakValues()
  .build(k -> DataObject.get("Data for " + k));
 
cache = Caffeine.newBuilder()
  .expireAfterWrite(10, TimeUnit.SECONDS)
  .softValues()
  .build(k -> DataObject.get("Data for " + k));

```


### 刷新

可以配置缓存来自动刷新实体

```java
Caffeine.newBuilder()
  .refreshAfterWrite(1, TimeUnit.MINUTES)
  .build(k -> DataObject.get("Data for " + k));

```

Here we should understand a difference between expireAfter and refreshAfter. When the expired entry is requested, an execution blocks until the new value would have been calculated by the build Function.

But if the entry is eligible for the refreshing, then the cache would return an old value and asynchronously reload the value.


### 统计数据

Caffeine有一种记录缓存使用数据的方法

```java
LoadingCache<String, DataObject> cache = Caffeine.newBuilder()
  .maximumSize(100)
  .recordStats()
  .build(k -> DataObject.get("Data for " + k));
cache.get("A");
cache.get("A");
 
assertEquals(1, cache.stats().hitCount());
assertEquals(1, cache.stats().missCount());

```

We may also pass into recordStats supplier, which creates an implementation of the StatsCounter. This object will be pushed with every statistics-related change.

