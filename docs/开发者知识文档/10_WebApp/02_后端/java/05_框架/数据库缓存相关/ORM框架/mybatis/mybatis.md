

## mybatis中使用java enum

- [如何在MyBatis中优雅的使用枚举](https://segmentfault.com/a/1190000010755321)
- [MyBatis自定义TypeHandler处理枚举](http://c.biancheng.net/view/4343.html)

## tips

### mybatis 打印 sql 到日志中

添加配置

```xml
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING" />
    </settings>
```
