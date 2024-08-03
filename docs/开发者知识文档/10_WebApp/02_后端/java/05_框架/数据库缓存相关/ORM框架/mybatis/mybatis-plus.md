
- [官网](https://baomidou.com/)
- [github](https://github.com/baomidou/mybatis-plus)
- [官方文档](https://baomidou.com/introduce/)


## 动态数据源

- [springboot +mybatis-plus 动态切换数据库](https://blog.csdn.net/qq_43898141/article/details/116047512)

```java
@@DS("sr__hive_catalog__mes_full")
public interface ProdTestDetailRealTimeMapper2
```

```yaml
spring
  datasource:
    dynamic:
      primary: master # 设置默认的数据源或者数据源组,默认值即为master
      strict: false # 严格匹配数据源,默认false. true未匹配到指定数据源时抛异常,false使用默认数据源
      datasource:
        master:
          url: jdbc:mysql://1.1.1.1:3306/db_master?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=false&allowMultiQueries=true&useServerPrepStmts=true
          username: root
          password: password
          driver-class-name: com.mysql.jdbc.Driver # 3.2.0开始支持SPI可省略此配置
          druid:
            filter:
              wall:
                config:
                  none-base-statement-allow: true
                  multi-statement-allow: true
        sr__hive_catalog:
          url: jdbc:mysql://1.1.1.1:9030/hive_catalog.db1?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=false&allowMultiQueries=true&useServerPrepStmts=true
          username: root
          driver-class-name: com.mysql.jdbc.Driver # 3.2.0开始支持SPI可省略此配置
          druid:
            filter:
              wall:
                config:
                  none-base-statement-allow: true
                  multi-statement-allow: true
```

