
## 命令

### mysql docker

```bash
docker run --name docker-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root_pwd -d mysql
```

### mysql bash cli

#### client 登录

#### 账号密码

```bash
mysql -uroot -ppwd -h127.0.0.1 -P3306
```

#### sock方式

mysql -uroot -ppwd -S /opt/tmp/sock/mysql3406.sock

#### 查看 mysql 版本

client
mysql --version

server
登录 server 后会打印
select version();

#### 非交互式命令

```bash
mysql -uroot -ppwd -h127.0.0.1 -P3306 -e "CREATE DATABASE your_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

mysql -uroot -ppwd -h127.0.0.1 -P3306 < my_schema.sql
```

### mysql inner cli

#### 创建databases
```sql
CREATE DATABASE `db_test`;
CREATE DATABASE your_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
drop DATABASE `db_test`;
```

#### 查看/修改字符集

```sql
SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';

USE your_database_name;
SHOW VARIABLES LIKE 'character_set_database';
SHOW VARIABLES LIKE 'collation_database';

-- 修改服务器字符集
SET character_set_server = 'charset_name';

-- 修改服务器校对规则
SET collation_server = 'collation_name';

-- 修改数据库字符集
ALTER DATABASE your_database_name CHARACTER SET 'charset_name';

-- 修改表字符集
ALTER TABLE your_table_name CONVERT TO CHARACTER SET 'charset_name';

-- 修改列字符集
ALTER TABLE your_table_name MODIFY column_name column_type CHARACTER SET 'charset_name';
```

#### 查看、使用数据库，查看表

```sql
show databases;
use db_name;
show tables;

# 查看创建的命令
SHOW CREATE TABLE table_name;
```

#### 执行sql脚本

```sql
source /path/to/xx.sql
```

#### 修改自增id起始值

```sql
alter table table_name AUTO_INCREMENT=10000;
```

#### 查看权限

```sql
show grants for user_name;
```

#### 设置主键

ALTER TABLE table_name ADD PRIMARY KEY (column_name);

#### 插入列

ALTER TABLE xxx ADD col_name varchar(12) NULL COMMENT 'xxx';
ALTER TABLE xxx ADD col_name varchar(12) NULL COMMENT 'xxx' after col_name2;

#### 删除行

delete from table where xxx;

#### 更新行

UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

#### 将结果导出到文件分析

```sql
tee  /xxx/log.txt;
notee;
```

#### 竖向显示

```sql
select * from demo\G
```

#### 查询所有 tables shcema

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

#### 插入数据

```sql
INSERT INTO table2
SELECT * FROM table1;

INSERT INTO Websites (name, country)
SELECT app_name, country FROM apps;
```

#### 执行sql文件

```sql
source /path/to/file.sql;
```

```bash
mysql -u username -p database_name < /path/to/file.sql
mysql -u username -p -e "source /path/to/file.sql" database_name
```

#### dump 数据

```bash
mysqldump -h xxx -P xxx -u root -p --databases db1 db2 >/tmp/user.sql
```

#### 查看读写

```sql
SELECT @@global.read_only, @@global.super_read_only;
```

#### 查看和设置事务隔离级别

READ UNCOMMITTED：读取未提交的数据
READ COMMITTED：读取已提交的数据（默认级别）
REPEATABLE READ：可重复读
SERIALIZABLE：可串行化

```sql
show variables like '%tx_isolation%';
select @@tx_isolation;
SELECT @@global.tx_isolation;
SELECT @@session.tx_isolation;

SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

## 时间函数

### 计算前一天、后一天

```sql
SELECT 
    DATE_FORMAT(DATE_SUB(DATE(`produce_time`), INTERVAL 1 DAY), '%Y-%m-%d') AS one_day_before, 
    DATE_FORMAT(DATE_ADD(DATE(`produce_time`), INTERVAL 1 DAY), '%Y-%m-%d') AS one_day_after,
    DATE_FORMAT(DATE(`produce_time`), '%Y-%m-%d')
FROM table1 limit 1;
```

## 性能优化

### 查看连接数量过多

```bash
mysql -uxx -pxx -hxx -Pxx -e "dbatman show processlist;" | awk '{print $2" "$4}' | uniq -c | sort -rn
```

### 慢查询

- [慢SQL治理分享](https://mp.weixin.qq.com/s/CrIHmXWSqvVj7hB1alZliw)

### 执行计划

```sql
explain select * from table1;
```

- [这一次，彻底读懂Mysql执行计划](https://juejin.cn/post/6844903545607553037)
- [mysql官网文档 执行计划](https://dev.mysql.com/doc/refman/5.7/en/explain-output.html#explain-extra-information)

### Query Profiler

- [MySQL Profiling 的使用](https://www.cnblogs.com/ggjucheng/archive/2012/11/15/2772058.html)

```sql
-- 开启
set profiling=1;

some-sql-execute

-- 查看
show profiles;

-- 详情
SHOW PROFILE *** FOR QUERY n;
show profile cpu, block io for query 6;
```

## 核心概念

### 存储过程

https://www.runoob.com/w3cnote/mysql-stored-procedure.html


### 日志

### 乐观锁，悲观锁

### 索引

- [MySQL索引18问](https://mp.weixin.qq.com/s/zbLWY9n5rvQy8kJq3r-jgw)

#### mysql日志

- 二进制日志`binlog`
- 中继日志`relaylog`
- 重做回滚日志`redolog、undolog`
- 慢查询日志`slowlog`，用来记录在MySQL中响应时间超过阀值的语句
- `~/.mysql_history` 执行过的语句都会记录在这里
- `general log`
```
mysql console

表格方式
SET GLOBAL log_output = 'TABLE';
SET GLOBAL general_log = 'ON';
select * from mysql.general_log

日志文件方式
SET GLOBAL log_output = "FILE";
touch logfile.log
chmod 777 logfile.log
SET GLOBAL general_log_file = "/path/to/your/logfile.log";
SET GLOBAL general_log = 'ON';
```

#### Undo Log 机制

- undo tablespace

### 驱动表

- [掌握MySQL连接查询到底什么是驱动表](https://www.cnblogs.com/sy270321/p/12760211.html)
- [了解MySQL中的驱动表](https://blog.haohtml.com/archives/17837)

当连接查询没有where条件时，左连接查询时，前面的表是驱动表，后面的表是被驱动表，右连接查询时相反，内连接查询时，哪张表的数据较少，哪张表就是驱动表
当连接查询有where条件时，带where条件的表是驱动表，否则是被驱动表


## mysql 配置

### ssl tls 配置


- [MySQL Tutorial – Configuring and Managing SSL On Your MySQL Server](https://scalegrid.io/blog/configuring-and-managing-ssl-on-your-mysql-server/)

```bash
# 关闭ssl
mysql xxxxx --ssl-mode=DISABLED
```

```sql
-- 查看 server ssl 配置
show variables like '%ssl%';
show variables like 'tls_version';
```




## tips

### 修改密码

- [MySQL修改密码（三种方法示例）](https://www.yiibai.com/mysql/changing-password.html)


### 看允许登录的IP范围

https://cloud.tencent.com/developer/news/201704

### 解决远程连接mysql很慢的方法(mysql_connect 打开连接慢)

```ini
[mysqld]
skip-name-resolve
```

根据文档说明，如果你的mysql主机查询DNS很慢或是有很多客户端主机时会导致连接很慢，由于我们的开发机器是不能够连接外网的，所以DNS解析是不可能完成的，从而也就明白了为什么连接那么慢了。同时，请注意在增加该配置参数后，mysql的授权表中的host字段就不能够使用域名而只能够使用 ip地址了，因为这是禁止了域名解析的结果。

## Q&A

> 如何关闭 ONLY_FULL_GROUP_BY

在mysql命令行里输入
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

或者使用聚合函数 ANY_VALUE()，会跳过 `ONLY_FULL_GROUP_BY` 检查
