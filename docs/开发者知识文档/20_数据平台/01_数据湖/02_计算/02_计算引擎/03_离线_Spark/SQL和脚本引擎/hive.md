
## Hive系统函数

- [Hive系统函数一览](https://www.studytime.xin/article/hive-knowledge-function.html?hmsr=toutiao.io&utm_campaign=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)


## hive UDF 用户定义函数


## metastore

- [Hive Metastore的故事](https://zhuanlan.zhihu.com/p/100585524)
- [metastore和hiveserver2](https://www.cnblogs.com/tibit/p/9029905.html)

## hiveServer2

hms 用来访问表的元数据
hiveserver2 用来访问表的数据


## 客户端 beeline

https://cloud.tencent.com/developer/article/2195590

beeline -u db_URL 

beeline -u jdbc:hive2://hadoop102:10000 -n omc

beeline -u jdbc:hive2://hadoop102:10000 -n omc -e 'select * from ods.test;'

beeline -u jdbc:hive2://hadoop102:10000 -n omc -f scrip.sql

--silent=[true/false]  ---减少显示的信息量：
--outputformat=[table/vertical/csv/tsv/dsv/csv2/tsv2] ---输出格式：
--delimiterForDSV= DELIMITER ---分隔值输出格式的分隔符。默认是“|”字符。


## 数据倾斜

- [知乎：深入浅出Hive数据倾斜](https://zhuanlan.zhihu.com/p/342563538)


## date 关键字

因为 date 是hive中的一个关键字，代表类型，所以如果字段名是 大厅，需要使用这个：`date`



## partitions

hive 分区目录可以通过 add partitions 来创建出来。创建出来之后元数据、目录都存在；目录被删除，元数据也存在；目录被删除，元数据存在，仍然能 show partitions 看到，仍然能 insert 进去

### 查看 partitions

show partitions tablename;

### 创建 partitions

ALTER TABLE tablename ADD IF NOT EXISTS PARTITION (`date` = '${date}', hour = '${hour}');

### 删除 partitions

ALTER TABLE tablename DROP IF EXISTS PARTITION (`date` = '${date}', hour = '${hour}');



## 函数

### SUBSTRING_INDEX

`SUBSTRING_INDEX` 是 Hive 中的一个函数，用于从字符串中按指定的分隔符提取子字符串。该函数返回一个包含原始字符串中满足条件的最后一个子字符串以及到该子字符串之前的所有字符的子串。

函数的基本语法如下：

```
SUBSTRING_INDEX(str, delim, [count])
```

- `str`：要处理的字符串。
- `delim`：用于确定子字符串的分隔符。
- `count`（可选）：指定要从字符串中返回的子字符串数量。如果 count 为正数，从左到右返回；如果为负数，从右到左返回。如果省略此参数，默认返回全部满足条件的子字符串。

例如：

```
SELECT SUBSTRING_INDEX('a,b,c,d', ',', -1);
```

上述 SQL 表达式将返回 'd'，因为 `'d'` 是从字符串 `'a,b,c,d'` 中用 `','` 分隔符分隔后，最后一个子字符串。


## hive sql

```sql
# 删除某个分区
alter table table_name drop if exists partition (date='xxx');

# 添加某个分区
alter table table_name add if not exists partition (date='xxx');

# 覆盖写入
INSERT OVERWRITE TABLE employee
PARTITION (dept_id=1, location='New York')
SELECT id, name, department_id, location, salary
FROM other_table
WHERE department_id = 1;


# 字符串类型如 [{"parentTaskId":111,offset:0},{"parentTaskId":111,offset:0},{"parentTaskId":111,offset:0}]
# 将parentTaskId抽离出来单独成列
SELECT  id,
        get_json_object(single_dependent, '$.parentTaskId')
FROM    (
            SELECT  id,
                    split(
                        regexp_extract(regexp_replace(dependencies, '},\\{', '};{'), "^\\[(.*)\\]$", 1),
                        ';'
                    ) AS dependencies_arr
            FROM    table
        ) t
LATERAL VIEW
        EXPLODE(t.dependencies_arr) v AS single_dependent
        
```


## hdfs load to hive partition

https://blog.csdn.net/CharlesCFA/article/details/113871606


## tips

> hive-sql 保留小数位数的方法

- [hive-sql查询结果保留特点小数位数的方法](https://blog.csdn.net/helloxiaozhe/article/details/103578666)


bucketUnion 优化
SkewedJoin 优化
