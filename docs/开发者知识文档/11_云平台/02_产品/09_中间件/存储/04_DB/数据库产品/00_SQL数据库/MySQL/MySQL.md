

## 索引

- [MySQL索引18问](https://mp.weixin.qq.com/s/zbLWY9n5rvQy8kJq3r-jgw)


## mysql docker

```bash
docker run --name docker-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql
```


## 命令

*登录*
```bash
mysql -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p
```

*创建databases*
```sql
CREATE DATABASE `db_test`;
drop DATABASE `db_test`;
```

*查看、使用数据库，查看表*
```sql
show databases;
use db_name;
show tables;
```

*执行sql脚本*
```sql
source /path/to/xx.sql
```

*修改自增id起始值*
```sql
alter table table_name AUTO_INCREMENT=10000;
```

*查看权限*
```sql
show grants for user_name;
```

*将结果导出到文件分析*
```sql
tee  /xxx/log.txt;
notee;
```

*竖向显示*
```sql
select * from demo\G
```

*查询所有 tables shcema*
```sql
SELECT
    *
FROM
    information_schema.columns
WHERE
    table_schema = 'dp_dorado_lj'
ORDER BY
    TABLE_NAME,
    ORDINAL_POSITION;
```

*插入数据*
```sql
INSERT INTO table2
SELECT * FROM table1;

INSERT INTO Websites (name, country)
SELECT app_name, country FROM apps;
```

*dump 数据*
```bash
mysqldump -h xxx -P xxx -u root -p --databases db1 db2 >/tmp/user.sql
```


## 修改密码

- [MySQL修改密码（三种方法示例）](https://www.yiibai.com/mysql/changing-password.html)


## 看允许登录的IP范围

https://cloud.tencent.com/developer/news/201704


## 乐观锁，悲观锁


## 执行计划

- [这一次，彻底读懂Mysql执行计划](https://juejin.cn/post/6844903545607553037)
- [mysql官网文档 执行计划](https://dev.mysql.com/doc/refman/5.7/en/explain-output.html#explain-extra-information)

## Undo Log 机制

- undo tablespace


## 驱动表

- [掌握MySQL连接查询到底什么是驱动表](https://www.cnblogs.com/sy270321/p/12760211.html)
- [了解MySQL中的驱动表](https://blog.haohtml.com/archives/17837)

当连接查询没有where条件时，左连接查询时，前面的表是驱动表，后面的表是被驱动表，右连接查询时相反，内连接查询时，哪张表的数据较少，哪张表就是驱动表
当连接查询有where条件时，带where条件的表是驱动表，否则是被驱动表


## mysql日志

- 二进制日志`binlog`
- 中继日志`relaylog`
- 重做回滚日志`redolog、undolog`
- 慢查询日志`slowlog`，用来记录在MySQL中响应时间超过阀值的语句


## tips

> 慢查询

- [慢SQL治理分享](https://mp.weixin.qq.com/s/CrIHmXWSqvVj7hB1alZliw)


## Q&A

> 如何关闭 ONLY_FULL_GROUP_BY

在mysql命令行里输入
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

或者使用聚合函数 ANY_VALUE()，会跳过 `ONLY_FULL_GROUP_BY` 检查

