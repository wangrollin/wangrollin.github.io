
## Cache

- 情况：访问逻辑，多个线程访问同一个key，此时cache没有value或者value已经过期
- 逻辑：只有一个会去拿，其他的都阻塞

