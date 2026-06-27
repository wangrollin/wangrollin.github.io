
## 网站

- [github](https://github.com/mybatis/mybatis-3)
- [官方文档](https://mybatis.org/mybatis-3/)
- [官方文档 中文](https://mybatis.org/mybatis-3/zh_CN/index.html)

## mybatis中使用java enum

- [如何在MyBatis中优雅的使用枚举](https://segmentfault.com/a/1190000010755321)
- [MyBatis自定义TypeHandler处理枚举](http://c.biancheng.net/view/4343.html)


## 动态数据源

- [springboot +mybatis-plus 动态切换数据库](https://blog.csdn.net/qq_43898141/article/details/116047512)


## 更新逻辑

为null的entity字段会自动跳过，不会更新，如果要更新某个字段为null，使用 wrapper

https://blog.csdn.net/Draymond_feng/article/details/107896977

```java
        LambdaUpdateWrapper<MyEntity> updateWrapper = new LambdaUpdateWrapper<>();

        updateWrapper.eq(MyEntity::getId, id)
                .set(MyEntity::getUpdatedTime, DateUtil.getCurrent())
                .set(MyEntity::getUpdatedBy, null);

        return update(updateWrapper);
```


## ${} #{} 区别

https://blog.csdn.net/qq_40925189/article/details/115839007


## tips

### mybatis 打印 sql 到日志中

添加配置

```xml
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING" />
    </settings>
```