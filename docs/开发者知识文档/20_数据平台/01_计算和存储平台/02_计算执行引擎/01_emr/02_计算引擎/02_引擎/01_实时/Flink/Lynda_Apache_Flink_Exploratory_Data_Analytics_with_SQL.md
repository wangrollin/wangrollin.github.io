
## Lynda: Apache Flink: Exploratory Data Analytics with SQL

### flink relational apis

##### what is apache flink

##### flink relational apis

relational api有两种：

​	table api，和实现的语言java scala 强绑定的

​	sql api，使用标准sql



两种api都支持批操作和流操作



##### integrations and connectors

不集成，relational api没法单独用

relational api可以和dataset api集成，处理有限的数据，标准分析

relational api可以和datastream api集成，处理无限的数据，windowing



flink table可以从dataset或者datastream生成，也可以保存成dataset或者datastream

dataset api、datastream api用于处理，relational api用于分析



flink table可以直接数据连接，比如file system、apache kafka、elasticsearch、hbase、jdbc



##### course prerequisites

##### setting up the exercise files



### basic batch analytics

##### ceatiing a table environment

table environment，从batch或者stream environment创建，有batch和stream两个模式，取决于从哪里创建的

table和schema会注册到table environment里，内部实现成dataset或者datastream操作

flink内部会尽可能做处理优化，也是懒执行

一个table，一个环境

table不能跨环境join操作



##### creating tables from a CSV

##### selecting table data

因为flink会尽可能并行操作，所以row的顺序不能保证



##### filtering data in tables

##### writing tables to files



### advanced batch analytics

##### aggretions on tables

##### ordering and limiting data

如果使用了order，那么任务就不会并行，而是放在一个task slot里执行，性能会有问题



##### adding new columns

##### joining tables

##### working with datasets



### streaming sql

##### challenges with streaming SQL

##### dynamic tables

动态表、持续查询

持续查询在动态表里不断的发生



##### appending and retracting data

append-only streams

retract streams

这个有点难度啊，需要看其他资料深究！



##### consuming kafka sources

##### running continuous queries



### advanced streaming analytics

##### windowing on streams

tumbling windows 一段时间的时间是一个windows

sliding windows 一段时间的时间是一个windows，有重叠部分

session windows 5s没有事件了，这个session就结束

不显式支持全局windows，但是如果做聚合又没给windows，那就是全局windows



event time

ingestion time

processing time



window start, window end 这俩时间戳会作为表中的两列



只有以key做group by，才会并行



不需要retraction，因为都有了；windowing只会产生append only stream



##### using tumbling and sliding windows

##### writing tables to kafka

一个table可以有多个sink



##### working with data streams

##### using event time



### use case project

##### use case problem definition

##### read source data into a flink table

##### compute total scores

##### conpute aggregations



### conclusion

