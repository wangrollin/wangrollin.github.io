
## redisson 分布式（同一线程）可重入锁 使用方法

```java
RLock dataLock = redissonClient.getLock("lock_name");

try {
    if (dataLock.tryLock(80, 80, TimeUnit.SECONDS)) {

        // do something
    }
} catch (Exception e) {

    logger.error("fail:", e);
} finally {

    if(dataLock.isHeldByCurrentThread()) {
        dataLock.unlock();
    }
}

```