

## 知识点

- binlog

## mysql docker

```bash
docker run --name docker-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql
```

## 登录命令

```bash
mysql -u root -p -P 3306
```



## 看允许登录的IP范围

https://cloud.tencent.com/developer/news/201704


## 乐观锁，悲观锁


## 执行计划

- [这一次，彻底读懂Mysql执行计划](https://juejin.cn/post/6844903545607553037)
- [mysql官网文档 执行计划](https://dev.mysql.com/doc/refman/5.7/en/explain-output.html#explain-extra-information)


## Q&A

> 如何关闭 ONLY_FULL_GROUP_BY

在mysql命令行里输入
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

或者使用聚合函数 ANY_VALUE()，会跳过 `ONLY_FULL_GROUP_BY` 检查

