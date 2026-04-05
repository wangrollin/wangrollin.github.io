
## hdfs 命令

https://blog.csdn.net/m0_43405302/article/details/122243263

hdfs dfs -CMD [-OPTION] [PATH1]
hadoop fs -CMD [-OPTION] [PATH1]


hdfs dfs -ls /

hdfs dfs -ls -R /
hdfs dfs -lsr /
hdfs dfs -mv from to
hdfs dfs -cp from to
hdfs dfs -rm xxx
hdfs dfs -rmr xxx
hdfs dfs -put localfile hdfspath
hdfs dfs -rmr xxx

hdfs dfs -lsr /user/hive/warehouse/db1.db/my_table | grep -v z_
hdfs dfs -rmr /user/hive/warehouse/db1.db/my_table/date=2024-05-26/hour=00/*

## 模块

### NameNode

### HDFS Balancer

保持数据平衡

### FsImage


## tips

### 合并小文件

## Tools

distCP
