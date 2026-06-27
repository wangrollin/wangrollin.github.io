
- [官网](https://sentinelguard.io/zh-cn/)
- [github doc](https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D)
- [github Awesome Sentinel](https://github.com/alibaba/Sentinel/blob/master/doc/awesome-sentinel.md)

## 配置

### 降级配置

```json
[
  {
    "resource": "xxx-srv-test",
    "grade": 0,
    "count": 10,
    "statIntervalMs": 60000,
    "minRequestAmount": 5,
    "slowRatioThreshold": 0.5,
    "timeWindow": 60
  }
]
```

解释：使用慢调用模式，超过10ms就是慢调用，在1min内，如果有超过5个请求，并且超过一半属于慢调用，则降级1min