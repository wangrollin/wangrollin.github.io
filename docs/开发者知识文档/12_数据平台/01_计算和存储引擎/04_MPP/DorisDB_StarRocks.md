
## 真真假假的关系 apache doris vs dorisDB vs starrocks

- [Apache Doris、DorisDB傻傻分不清](https://www.sohu.com/a/488816742_827544)

apache doris：百度捐赠给 apache 的开源项目

DorisDB -> starRocks开源


## 网页

- [官网](https://www.dorisdb.com/zh-CN/index)
- [github](https://github.com/StarRocks/starrocks)
- [对比 clickhouse starrocks trino](https://segmentfault.com/a/1190000044149821)


## 安装步骤

部署 FE BE

- [手动部署 StarRocks](https://docs.starrocks.io/zh/docs/3.1/deployment/deploy_manually/)


## 修改 root 密码

ALTER USER 'jack' IDENTIFIED BY '123456';

https://docs.starrocks.io/zh/docs/sql-reference/sql-statements/account-management/ALTER_USER/#:~:text=ALTER%20USER%201%20%E5%8A%9F%E8%83%BD%20%E6%9B%B4%E6%94%B9%20StarRocks%20%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF%EF%BC%8C%E4%BE%8B%E5%A6%82%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%EF%BC%8C%E8%AE%A4%E8%AF%81%E6%96%B9%E5%BC%8F%EF%BC%8C%E6%88%96%E9%BB%98%E8%AE%A4%E8%A7%92%E8%89%B2%E3%80%82%20%E6%8F%90%E7%A4%BA,USER%20%27jack%27%20%20IDENTIFIED%20%20BY%20%27123456%27%3B%20


## 查看 fe be 状态

mysql -h 1.1.1.1 -P9030 -uroot
mysql -h 1.1.1.1 -P9030 -uroot -ppwd

10.32.223.234/24
mysql -h 10.32.223.234 -P9030 -uroot

SHOW PROC '/frontends'\G
SHOW PROC '/backends'\G


ALTER SYSTEM ADD BACKEND "<be_address>:<heartbeat_service_port>", "<be2_address>:<heartbeat_service_port>", "<be3_address>:<heartbeat_service_port>";
ALTER SYSTEM ADD BACKEND "10.32.223.234:9050";


## catalogs

```mysql
SHOW CATALOGS;


-- 查询某个 External Catalog 的创建语句
SHOW CREATE CATALOG hive_catalog_glue;

-- 切换 catalog
SET CATALOG <catalog_name>

-- 直接切换
USE <catalog_name>.<db_name>

-- 删除
DROP Catalog hive_catalog_glue;

-- 查看表结构
DESC[RIBE] <catalog_name>.<database_name>.<table_name>

-- 查看表结构和表文件存放位置
SHOW CREATE TABLE <catalog_name>.<database_name>.<table_name>

-- 查看指定 catalog 的数据库
SHOW DATABASES FROM <catalog_name>

-- 查看数据
SELECT count(*) FROM <table_name> LIMIT 10

-- hive -> SR
INSERT INTO default_catalog.olap_db.olap_tbl SELECT * FROM hive_table

-- 权限
GRANT SELECT ON ALL TABLES IN ALL DATABASES TO ROLE <role_name>


-- 通过如下命令创建角色 hive_role_table, 切换至 Hive Catalog hive_catalog, 然后把 hive_catalog 内所有表和视图的查询权限都赋予 hive_role_table：

-- 创建角色 hive_role_table。
CREATE ROLE hive_role_table;

-- 切换到数据目录 hive_catalog。
SET CATALOG hive_catalog;

-- 把 hive_catalog 内所有表和视图的查询权限赋予 hive_role_table。
GRANT SELECT ON ALL TABLES IN ALL DATABASES TO ROLE hive_role_table;

```


## 创建 hive catalog

- [Hive catalog](https://docs.starrocks.io/zh/docs/3.1/data_source/catalog/hive_catalog/)

```
CREATE EXTERNAL CATALOG <catalog_name>
[COMMENT <comment>]
PROPERTIES
(
    "type" = "hive",
    GeneralParams,
    MetastoreParams,
    StorageCredentialParams,
    MetadataUpdateParams
);


CREATE EXTERNAL CATALOG dataops_hive
PROPERTIES
(
    "type" = "hive",
    "hive.metastore.type" = "hive",
    "hive.metastore.uris" = "thrift://1.1.1.1:9083"
);


```


### 配置 hive kerberos

https://www.inlighting.org/archives/trino-starrocks-emr-kerberos-setup


### 刷新hive缓存

REFRESH EXTERNAL TABLE <table_name> [PARTITION ('partition_name', ...)]

### hive 在写某个分区, sr 直接读那个分区, 会报错

hive读会卡住, pending。SR 读会直接报错。不要使用改写, 使用纯粹物化视图



## 外表+物化视图

启用 Hive 元数据缓存刷新功能


### 新建

```sql
CREATE MATERIALIZED VIEW [IF NOT EXISTS] [database.]<mv_name>
[COMMENT ""]
-- distribution_desc
DISTRIBUTED BY HASH(<bucket_key>[,<bucket_key2> ...]) [BUCKETS <bucket_number>]
-- refresh_scheme
[REFRESH 
    [ASYNC | ASYNC [START (<start_time>)] EVERY (INTERVAL <refresh_interval>) | MANUAL]
]
-- partition_expression
[PARTITION BY 
    {<date_column> | date_trunc(fmt, <date_column>)}
    str2date(date, "%Y-%m-%d")
]
-- order_by_expression
[ORDER BY (<sort_key>)]
[PROPERTIES ("key"="value", ...)]
AS 
<query_statement>
```


### 删除

drop MATERIALIZED VIEW xxxx;


### 修改

```sql

-- 修改视图定义。
ALTER VIEW <view_name> AS <query>;

-- 启用被禁用的异步物化视图（将物化视图的状态设置为 Active）。

ALTER MATERIALIZED VIEW order_mv ACTIVE;

-- 修改异步物化视图名称为 order_total。

ALTER MATERIALIZED VIEW order_mv RENAME order_total;

-- 修改异步物化视图的最大刷新间隔为 2 天。

ALTER MATERIALIZED VIEW order_mv REFRESH ASYNC EVERY(INTERVAL 2 DAY);

```

### 查看物化视图

SHOW MATERIALIZED VIEWS\G



## 性能调优

### 调整查询内存上限

您可以通过以下命令调整查询内存上限。

SET query_mem_limit = INT;

query_mem_limit：单个查询的内存限制，单位是 Byte。建议设置为 17179869184（16GB）以上。

-- 20G
SET query_mem_limit = 21474836480;


SET query_mem_limit = 21474836480;
SET session query_mem_limit = 21474836480;
SET global query_mem_limit = 21474836480;

show variables like "%query_mem_limit%";
show session variables like "%query_mem_limit%";
show global variables like "%query_mem_limit%";


## 实际操作

sr 3.2 -> cdh 6.3.2

HMS 节点的主机名及 IP 地址之间的映射关系添加到 /etc/hosts 路径

10.32.223.86  lhdl-bdatmgmt-01.example.local lhdl-bdatmgmt-01
10.32.223.87  lhdl-bdatmgmt-02.example.local lhdl-bdatmgmt-02
10.32.223.88  lhdl-bdatmgmt-03.example.local lhdl-bdatmgmt-03
10.32.223.89  lhdl-bdatbus-01.example.local lhdl-bdatbus-01
10.32.223.90  lhdl-bdatbus-02.example.local lhdl-bdatbus-02
10.32.223.91  lhdl-bdatbus-03.example.local lhdl-bdatbus-03


hdfs-site.xml
$FE_HOME/conf 路径下
$BE_HOME/conf 路径
cp /opt/bigdata/hdfs-site.xml /opt/bigdata/software/StarRocks-3.1.12/fe/conf/hdfs-site.xml
cp /opt/bigdata/hdfs-site.xml /opt/bigdata/software/StarRocks-3.1.12/be/conf/hdfs-site.xml
ll fe/conf/
ll be/conf/


hive-site.xml 挪到该目录下
vim /opt/bigdata/hive-site.xml
cp /opt/bigdata/hive-site.xml /opt/bigdata/software/StarRocks-3.1.12/fe/conf/hive-site.xml
cp /opt/bigdata/hive-site.xml /opt/bigdata/software/StarRocks-3.1.12/be/conf/hive-site.xml
vim /opt/bigdata/software/StarRocks-3.1.12/fe/conf/hive-site.xml
vim /opt/bigdata/software/StarRocks-3.1.12/be/conf/hive-site.xml
rm -f /opt/bigdata/software/StarRocks-3.1.12/fe/conf/hive-site.xml
rm -f /opt/bigdata/software/StarRocks-3.1.12/be/conf/hive-site.xml
ll fe/conf/
ll be/conf/


core-site.xml 挪到该目录下
vim /opt/bigdata/core-site.xml
cp /opt/bigdata/core-site.xml /opt/bigdata/software/StarRocks-3.1.12/fe/conf/core-site.xml
cp /opt/bigdata/core-site.xml /opt/bigdata/software/StarRocks-3.1.12/be/conf/core-site.xml
ll /opt/bigdata/software/StarRocks-3.1.12/fe/conf/
ll /opt/bigdata/software/StarRocks-3.1.12/be/conf/


vim /opt/bigdata/software/StarRocks-3.1.12/fe/conf/hadoop_env.sh
vim /opt/bigdata/software/StarRocks-3.1.12/be/conf/hadoop_env.sh
最开头增加 来设置该用户名
export HADOOP_USER_NAME="hdfs"

vim fe/conf/fe.conf
vim be/conf/be.conf
文件中添加
JAVA_OPTS="-Djava.security.krb5.conf=/etc/krb5.conf"
-Djava.security.krb5.conf=/etc/krb5.conf

kinit -kt /opt/bigdata/hdfs.keytab hdfs@BIGDATA.COM
kinit -kt /opt/bigdata/hdfs_mgt02.keytab hdfs/lhdl-bdatmgmt-02.example.local@BIGDATA.COM
kinit -kt /opt/bigdata/software/StarRocks-3.1.12/hdfs.keytab hive/lhdl-bdatmgmt-03.example.local@BIGDATA.COM

klist
因此需要使用 cron 定期执行该命令
crontab -l
crontab -e
0 7 * * * /usr/bin/kinit -kt /opt/bigdata/hdfs.keytab hdfs@BIGDATA.COM


重启 fe be
ps aux | grep StarRocks-3.1.12
cd /opt/bigdata/software/StarRocks-3.1.12
./fe/bin/stop_fe.sh --daemon
./be/bin/stop_be.sh --daemon
./fe/bin/start_fe.sh --daemon
./be/bin/start_be.sh --daemon


mysql -h 1.1.1.1 -P9030 -uroot
SET CATALOG dataops_hive;
show databases;


hive/_HOST@BIGDATA.COM -> hdfs@BIGDATA.COM

hdfs/lhdl-bdatmgmt-02.example.local


cd /opt/bigdata/software/StarRocks-3.1.12
vim fe/conf/fe.conf
vim be/conf/be.conf

mysql -h 1.1.1.1 -P9030 -uroot

SHOW PROC '/frontends'\G
SHOW PROC '/backends'\G


-- 将 <be_address> 替换为 BE 节点的 IP 地址（priority_networks）或 FQDN, 
-- 并将 <heartbeat_service_port>（默认：9050）替换为您在 be.conf 中指定的 heartbeat_service_port。
ALTER SYSTEM ADD BACKEND "<be_address>:<heartbeat_service_port>", "<be2_address>:<heartbeat_service_port>", "<be3_address>:<heartbeat_service_port>";
ALTER SYSTEM ADD BACKEND "1.1.1.1:9050";


### 查询加速

create database my_database;

SHOW MATERIALIZED VIEWS\G

drop MATERIALIZED VIEW my_database.mv_ods_prod_test_detail_dt;

CREATE MATERIALIZED VIEW my_database.mv_ods_prod_test_detail_dt
DISTRIBUTED BY HASH(dt)
REFRESH ASYNC EVERY(INTERVAL 1 DAY) 
PROPERTIES (
    "force_external_table_query_rewrite" = "TRUE"
)
AS
select atsn, testdate, dt from dataops_hive.my_database.my_table 
where dt <= current_date()
AND dt >= date_add(current_date(), INTERVAL -30 DAY);


explain LOGICAL
select atsn from dataops_hive.my_database.my_table 
where dt <= current_date()
AND dt >= date_add(current_date(), INTERVAL -30 DAY)
order by atsn desc
limit 100000;
