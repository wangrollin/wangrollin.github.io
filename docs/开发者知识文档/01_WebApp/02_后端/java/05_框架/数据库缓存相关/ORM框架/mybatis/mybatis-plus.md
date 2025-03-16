
- [官网](https://baomidou.com/)
- [github](https://github.com/baomidou/mybatis-plus)
- [官方文档](https://baomidou.com/introduce/)


## page

```java
      return baseMapper.selectPage(
                page, 
                new QueryWrapper<Record>()
                        .eq(StringUtils.isNotBlank(xxx), "xxx", xxx)
                )
                 .getRecords();;
```

```java
    // 创建分页对象
        Page<User> page = new Page<>(pageNum, pageSize);

        // 使用链式查询进行分页查询
        IPage<User> userPage = new LambdaQueryChainWrapper<>(userMapper)
               .ge(User::getAge, 18) // 示例条件：年龄大于等于 18
               .page(page);

        return userPage;
```

## lambdaQuery sql 关键字报错

@TableField("`product_sn`")

## select distinct 三种方法

// 方法1
List<Config> result = list(new QueryWrapper<Config>().select("distinct code, area"));

// 方法2：使用QueryWrapper的distinct方法
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.select("id", "name").distinct(true).eq("age", 18);
List<User> userList = userMapper.selectList(queryWrapper);

// 方法3：使用LambdaQueryWrapper的distinct方法
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.select(User::getId, User::getName).distinct(true).eq(User::getAge, 18);
List<User> userList = userMapper.selectList(lambdaQueryWrapper);



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

