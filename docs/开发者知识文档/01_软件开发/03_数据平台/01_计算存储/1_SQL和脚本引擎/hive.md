
## hive UDF

用户定义函数


## hive sql

```sql
# 删除某个分区
alter table table_name drop if exists partition (date='xxx');

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

## tips

> hive-sql 保留小数位数的方法

- [hive-sql查询结果保留特点小数位数的方法](https://blog.csdn.net/helloxiaozhe/article/details/103578666)

