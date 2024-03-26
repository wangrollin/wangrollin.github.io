
Apache Hudi（Hadoop Upserts Deletes and Incrementals）由Uber开源

hudi 表

## 网页

- [官网](https://hudi.apache.org/)
- [数仓实时化改造：Hudi on Flink 在顺丰的实践应用](https://www.infoq.cn/article/oahf08ykutidlemb5dha)
- [AWS - Hudi 工作原理](https://docs.aws.amazon.com/zh_cn/emr/latest/ReleaseGuide/emr-hudi-how-it-works.html)


## 如何实现 timeline，两种方法

- CoW -- copy on write -- 高效 upsert
- MoR -- merge on read

Hudi 的核心优势主要分为两部分：

首先，Hudi 提供了一个在 Hadoop 中更新删除的解决方案，所以它的核心在于能够增量更新，同时增量删除。增量更新的好处是国内与国际现在对隐私数据的保护要求比较高，比如在 Hive 中清理删除某一个用户的数据是比较困难的，相当于重新清洗一遍数据。使用 Hudi 可以根据主键快速抓取，并将其删除掉。

另外，时间漫游。之前我们有很多应用需要做准实时计算。如果要找出半个小时内的增量到底是什么，变化点在哪，必须要把一天的数据全捞出来，过滤一遍才能找出来。Hudi 提供时间漫游能力，只需要类似 SQL 的语法就能快速地把全部增量捞出来，然后后台应用使用时，就能够直接根据里面的数据做业务的更新，这是 Hudi 时间漫游里最重要的能力。

