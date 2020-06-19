

## flink sink for jdbc



```xml
<dependency>
    <groupId>org.apache.phoenix</groupId>
    <artifactId>phoenix-core</artifactId>
    <version>5.0.0-HBase-2.0</version>
</dependency>

<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-common</artifactId>
    <version>2.8.4</version>
</dependency>
```



```java
package com.example.wechat.apievent;

import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.sink.RichSinkFunction;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.example.wechat.common.Constants;
import java.util.Map;

public class ApiEventPhoenixSink extends RichSinkFunction<Map<String, String>> {

    private Connection connection;

    private static final String insertIntoAccesslogSql = "UPSERT INTO wrl_accesslog VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private PreparedStatement insertIntoAccesslogPreparedStatement;

    @Override
    public void open(Configuration parameters) throws Exception {
        
        String USERNAME = "";
        String PASSWORD = "";
        String DBURL = "jdbc:phoenix:example.com:2181";
        Class.forName("org.apache.phoenix.jdbc.PhoenixDriver");
        
        connection = DriverManager.getConnection(DBURL,USERNAME,PASSWORD);
        insertIntoAccesslogPreparedStatement = connection.prepareStatement(insertIntoAccesslogSql);
        super.open(parameters);
    }

    @Override
    public  void invoke(Map<String, String> data, Context context) throws Exception {

        try {

            data.entrySet().stream().forEach(entry -> {

                String tableName = entry.getKey();
                String[] columns = entry.getValue().split(Constants.VERTICAL);
                // data: 0-app_key, 1-openid, 2-timestamp, 3-pid, 4-title, 5-url,6-queryString,7-ip,8-referer,9-user-agent,10-load_date,11-event_id
                // columns: 1-url,2-openid,3-timestamp,4-APP_KEY,5-PID,6-TITLE,7-QUERYSTRING,8-IP,9-REFERER,10-USER_AGENT, 11-LOAD_DATE, 12-EVENT_ID

                switch (tableName.toLowerCase()) {
                    
                    case "accesslog":
                        try {
                            insertIntoAccesslogPreparedStatement.setString(1, columns[5]);
                            insertIntoAccesslogPreparedStatement.setString(2, columns[1]);
                            insertIntoAccesslogPreparedStatement.setString(3, columns[2]);
                            insertIntoAccesslogPreparedStatement.setString(4, columns[0]);
                            insertIntoAccesslogPreparedStatement.setString(5, columns[3]);
                            insertIntoAccesslogPreparedStatement.setString(6, columns[4]);
                            insertIntoAccesslogPreparedStatement.setString(7, columns[6]);
                            insertIntoAccesslogPreparedStatement.setString(8, columns[7]);
                            insertIntoAccesslogPreparedStatement.setString(9, columns[8]);
                            insertIntoAccesslogPreparedStatement.setString(10, columns[9]);
                            insertIntoAccesslogPreparedStatement.setString(11, columns[10]);
                            insertIntoAccesslogPreparedStatement.setString(12, columns[11]);
                            insertIntoAccesslogPreparedStatement.executeUpdate();
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                        break;
                }
            });
            connection.commit();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close() throws Exception {
        if(insertIntoAccesslogPreparedStatement != null){
            insertIntoAccesslogPreparedStatement.close();
        }
        if(connection != null){
            connection.close();
        }
        super.close();
    }
}
```





## flink sink for hbase



```xml
<dependency>
    <groupId>org.apache.flink</groupId>
    <artifactId>flink-hbase_${scala.binary.version}</artifactId>
    <version>${flink.version}</version>
</dependency>
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-client</artifactId>
    <version>2.7.1</version>
</dependency>
```



```java
package com.example.wechat.apievent;

import com.esotericsoftware.minlog.Log;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.sink.RichSinkFunction;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ApiEventHBaseSink extends RichSinkFunction<Map<String, String>> {

    private static final Logger LOG = LoggerFactory.getLogger(ApiEventHBaseSink.class);
    private static final long FLUSH_PERIOD = 5000;
    private static final String COLUMN_FAMILY = "csv";
    private static final String COLUMN = "column1";

    private static volatile long lastFlushTime = System.currentTimeMillis();
    private static org.apache.hadoop.conf.Configuration configuration;
    private static Connection connection = null;
    private static Admin hBaseAdmin = null;
    private static Map<String, BufferedMutator> mutatorMap = new HashMap<>();

    @Override
    public void open(Configuration parameters) throws Exception {

        configuration = HBaseConfiguration.create();
        configuration.set("hbase.master", "example.com:60000");
        configuration.set("hbase.zookeeper.quorum", "example.com");
        configuration.set("hbase.zookeeper.property.clientPort", "2181");

        try {
            connection = ConnectionFactory.createConnection(configuration);
            hBaseAdmin = connection.getAdmin();
        } catch (IOException e) {
            LOG.error(e.getMessage());
        }

        System.out.println("connection hBaseAdmin init ok.");

    }

    @Override
    public void close() throws IOException {

        mutatorMap.values().forEach(mutator -> {

            try {
                if (mutator != null) {
                    mutator.close();
                }
            } catch (IOException e) {
                LOG.error(e.getMessage());
            }
        });

        if (connection != null) {
            connection.close();
        }

        if (hBaseAdmin != null) {
            hBaseAdmin.close();
        }
        System.out.println("connection hBaseAdmin close ok.");


    }

    @Override
    public void invoke(Map<String, String> map, Context context) throws Exception {

        map.entrySet().stream().forEach(entry -> {

            String tableName = entry.getKey();

            String rowKey = UUID.randomUUID().toString();
            String value = entry.getValue();

            Put put = new Put(rowKey.getBytes());
            put.addColumn(COLUMN_FAMILY.getBytes(), COLUMN.getBytes(), value.getBytes());

            try {

                if (!hBaseAdmin.tableExists(TableName.valueOf(tableName))) {
                    createHBaseTable(tableName);
                }
                if (!mutatorMap.containsKey(tableName)) {
                    BufferedMutatorParams params = new BufferedMutatorParams(TableName.valueOf(tableName));
                    params.writeBufferSize(2 * 1024 * 1024);
                    mutatorMap.put(tableName, connection.getBufferedMutator(params));
                }
                mutatorMap.get(tableName).mutate(put);

            } catch (IOException e) {

                e.printStackTrace();
            }
        });

        flushDataIfPossible();
        System.out.println("invoke ok");

    }

    private static void flushDataIfPossible() {

        if (System.currentTimeMillis() > lastFlushTime + FLUSH_PERIOD) {

            lastFlushTime = System.currentTimeMillis();
            mutatorMap.values().forEach(mutator -> {
                try {

                    if (mutator != null) {
                        mutator.flush();
                        System.out.println(mutator.getName() + " flush ok.");
                    }
                } catch (IOException e) {

                    Log.error(e.getMessage());
                }
            });
        }
    }

    private synchronized static void createHBaseTable(String tableName) throws IOException {

        if (!hBaseAdmin.tableExists(TableName.valueOf(tableName))) {

            HTableDescriptor table = new HTableDescriptor(TableName.valueOf(tableName));
            HColumnDescriptor family = new HColumnDescriptor(COLUMN_FAMILY.getBytes());
            table.addFamily(family);
            hBaseAdmin.createTable(table);
            System.out.println(tableName + " create ok.");
        }
    }
}

```









## Lynda学习：Apache Flink: Batch Mode Data Engineering

#### apache flink

##### what is apache flink

batch、stream 两种



##### apache flink features

dataset apis：批处理

datastream apis：流处理

SQL/Table apis：SQL驱动的处理

processing functions：处理函数：细致的控制

flinkML：机器学习

支持的语言：java scala python

关键特性：

​	event time processing

​	state management

​	fault tolerant

​	data connectors



##### architecture of apache flink

- flink program（用户写的java代码，包含处理逻辑，绑着所有依赖的jars）
- job clint（连接flink program和job manager，为client program构建dataflow，提交dataflow给job manager，跟踪进度和结果，dataflow是有向无环图DAG，）
- job manager（作为编排者，接收job然后调度job来执行，支持高可用）
- task manager(task slots, task slots)（是worker，一个网络里可以有多个task manager来共享一个job，可以并行处理和扩展，task slots来接某个具体的job，同一时间只能执行一个job）



Flink Modes：

local mode（single JVM，用来开发）

standalone cluster mode（用来生产，可以扩展上百个task manager节点）

YARN（在yarn里运行flink，和hadoop一起）



##### flink program structure

搭建好运行环境 env = get

读入数据 text = env.

处理数据 counts = text.

储存结果 counts.writeAsCsv



flink使用lazy evaluation，延迟评估；除非操作被调用，否则不会去执行任何操作，前面都只是获得信息；



##### flink execution flow

flink program需要被转换成DAG，然后才能执行

这个转换不会执行，除非要输出结果、或者显式调用execute

懒加载，可以让flink去根据操作来优化性能



flink program连接到执行环境

flink program提交到job client

job client创建data flow

​	internal execution plan

​	DAG

data flow 提交给job manager

job manager分析data flow，并决定最优的资源分配，如果可能还会拆分任务来并行执行，根据可用的task slot来分配task manager

task manager来执行每个独自的任务，执行完之后，向job manager汇报执行过程和结果

checkpoint 检查点会周期性完成，为当前状态的快照，如果task manager宕机，那么这些checkpoint就用来恢复任务

返回结果



#### setting up flink

##### installing flink standalone

home brew install apache-flink

或者去官网下载tar，解压，./bin/start-cluster.sh，打开浏览器localhost:8081，是dashboard

./bin/flink run ./examples/batch/WordCount.jar 

./bin/stop-cluster.sh



##### creating a flink project

create new project in IDEA

选择maven项目，选择 create from archetype，add archetype，

groupid：org.apache.flink

artifactid: flink-quistart-java

version:1.10.0

create OK



##### build a sample flink program

在local mode跑的时候，需要将依赖改成compile，默认是provided，因为在cluster模式，使用的是flin提供的jar，但是local mode会报class not found；到project structure把依赖的provided改成compile

开发方式：先启动一个flink program，本地测试结束，然后打成jar，部署到flink上



##### running jobs on the cluster

打成jar，IDEA，选择project structure，选择artifacts，添加jar from modules with dependencies，选择main class；IDEA，选择build，build artifacts 选项

./bin/flink run -c com.wangrollin.flink.SampleJob MyJob.jar



##### using the flink web interface

UI里能看到长期运行的任务，能分析出瓶颈所在

UI里可以直接上传jar来运行



##### setting up the exercise files



#### dataset api

##### dataset api concepts

dataset：数据的不可变集合，有限的个数，常见来源：txt file，HDFS file，database query；有时间前缀；处理完之后，通常会写回去，写：file，database，map之后可能会新建database并写入新的table结构和数据

dataset record：一串不可变对象，POJOs

dataset api：

​	record level：map、flatMap、filter、reduce、aggregate

​    dataset level：distinct、join、CoGroup、Cross、Union



##### reading a CSV file

代码已经上传到了github，可以看demo

输出读入数据的前五个，是不保证顺序的



##### using map

属性级别的

```
implements MapFunction

rawOrders.map( new MapComputeTotalOrderValue() );
```

会并行处理

是一对一的关系，给一个，就返回一个



##### using flatMap

record 级别的，更细致的操作

可以不是一对一，给一个，可以collect任意多个

```
implements FlatMapFunction

rawOrders.flatMap(new FlatMapExtractCustomerTags());
```



##### using filters

filter不能修改数据，只能过滤数据

```
implements FilterFunction

computedOrders.filter( new FilterOrdersByDate() );
```



##### using aggregates

sum count average

```java
//Use Projections to filter subset of columns
DataSet<Tuple2<Integer,Double>> orderColumns
        = computedOrders.project(4,7);

//Find Average Order Size and Total Order Value
DataSet totalOrders =
           orderColumns
                 .aggregate(SUM,0) //Total Order Item Count
                 .and(SUM,1); //Total Order Value

//Extract the Summary row tuple, by converting the DataSet to a List and
//fetching the first record
Tuple2<Integer, Double> sumRow
        = (Tuple2<Integer,Double>) totalOrders.collect().get(0);
```



##### using reduce

自己定制aggregate方法，从较多数量的变成较少数量的dataset

是迭代的运作方式 sum+=arr[i]

```java
implements ReduceFunction

            DataSet<Tuple3<String,Integer,Double>> productOrderSummary

                    = computedOrders
                            .map(i -> Tuple3.of(i.f2, 1, i.f7)) //Subset of columns
                            .returns(Types.TUPLE(Types.STRING ,
                                    Types.INT, Types.DOUBLE )) //Set return types

                            .groupBy(0)  //Group by Product
                            .reduce(new ReduceProductwiseSummary());  //Summarize by Product
```



#### advanced capabilities

##### using POJO classes

```java
/* Load the Product vendor information into a POJO Dataset.
CSVs can be loaded as and processed as classes.
*/
DataSet<ProductVendorPojo> productVendor
        = env.readCsvFile("src/main/resources/product_vendor.csv")
        .ignoreFirstLine()
        .pojoType(ProductVendorPojo.class, "product", "vendor");
```



##### join operations

```java
implements JoinFunction
```



##### using MySQL with Flink

代码看过了



##### using broadcast variables

用join是很慢的，所以使用broadcast 变量，每个task slot都能获取到

richMap：一个map+broadcast 变量，返回一个map

代码在示例中



#### use case project

##### problem definition

##### computing total score

##### printing scores for physics

##### computing average scores across subjects

##### find the top student for each subject



#### conclusion



## Lynda学习：Apache Flink: Real-Time Data Engineering



### Apache Flink

##### what is apache Flink

flink是分布式流处理框架

和spark、storm竞争



##### streaming with apache flink

无限制数量的数据

计算出的结果很快就会过期，不能体现最新的数据status

状态管理

延迟，从数据进来到出来结果，毫秒级别，ms，不需要batch，是真正的流

支持array of connectors，让不通的流、源，进来数据

event time processing：time stamp

exactly once consistency

高可用：快照，持久化，并从中回复



##### DataStream API

event流进来，就一个一个处理

支持map reduce操作

支持windowing



##### Related prerequisite courses

keyby 分割数据

windowsing 聚合数据

split、merge 分离、合并数据



##### setting up5 exercise files

很多包的scope是provided，因为部署的时候，flink已经提供了这些包



### DataStream API

##### setting up the Flink environment

不断地创建只含有一条数据的CSV文件

kafka



##### reading from a stream source

建立从文件到datastream的连接，源源不断地拿到string，然后map到pojo dataset



##### processing streaming data

可以在时间窗口内的数据聚合操作

代码在示例中



##### writing to a stream sink

##### using keyed streams

可以把数据按照一定规格进行分割，同样类型的放在同样的task slot中，类似于批处理的group by，分开之后可以进行基于window的聚合操作



##### processFunction

processFunction是底层的处理函数，map filter是上层的函数，开箱即用，但是缺乏一些灵活性；processFunction有更多的灵活性，可以接触到更多的资源，但是需要更强的功力

processFunction可以接触到的资源包括：

​	events

​	state

​	timers

​	side outputs

Runtime context: processFunction可以获取到Runtime context

Runtime context能接触到

​	accumulators

​	broadcast variables

​	cache

​	configuration

​	state

processFunction可以输出side output，通常情况下只有一个主流，可以用output side来吧流横切或者竖切，一半去主流，一半去边流

一个input可以有0、1、2个output



##### Splitting a stream

把数据分成两条，如果用filter，需要用多个，而直接split会简单一些



##### Merging multiple streams



### windowing

##### windowing concepts

windowing可以让一段时间内的数据进行聚合操作

window类型：

- tumbling window（时间10）：固定时间的window，例如每5秒钟是一个window；默认就是这个
- sliding windows（时间10，slide by5）：后一个window可能会重合前一个window的一部分
- session windows（5s gap）： 五秒之内的都是一个window，超过五秒，则window结束
- global window：所有的是一个window
- 用户可以自定义逻辑来决定window的边界



##### Using a Kafka streaming source

```xml
<dependency>
   <groupId>org.apache.flink</groupId>
   <artifactId>flink-connector-kafka_2.11</artifactId>
   <version>1.9.0</version>
</dependency>
```

 

##### Using sliding windows

##### Using session windows

##### window joins

是相乘的关系



### Event Time Prcessing

##### Time attributes in Flink

时间戳在流处理中非常重要，比如说window

时间属性有三个

![image-20200312205502100](flink.assets/image-20200312205502100.png)

flink可以使用任意一种时间属性来做windowing

使用event time是最合适的，也是app产生时就带的时间；在产生和处理之间会有延迟，同样的事件时间从不同的app发出来，被process func处理的时间可能不同，可能到达顺序不是时间顺序；解决方法是watermark

processing time是基于flink所在的node的系统时间的；默认是processing time

ingestion，到达时间，很少在flink中使用



##### watermarks

event time是最常用的用来做window的时间属性，但是因为有延迟，怎么能知道时间范围内的都已经到了flink了呢？解决方案是watermark

watermark用于event time的处理中，可以决定什么时候处理event；所有到达的event要等待watermark发生，发生时，从上一个watermark到这一个之间的event要被处理

watermark可以是周期的，也可以定制逻辑

watermark（2s delay）可以有延迟缓存，delay buffer，用来cover从数据源到flink 节点的延迟

event time是基于app时间的，watermark是基于flink系统时间的

watermark保证了一致性，但是也会带来延迟，要权衡

![image-20200312213002603](flink.assets/image-20200312213002603.png)



##### setting up event time

flink默认是processing time

选择event time之后要设置event time，assignTimestampsAndWatermarks()

periodic 的 watermark，周期性出现

Punctuated 的 watermark，可以定制内部逻辑

extractTimestamp，每次event进来之后都会调用这个方法来获取event time

checkAndGetNextWatermark，每次调用完extractTimestamp就会调用这个方法，来产生下一个watermark，只有返回的watermark大于上一次返回的，才会有效；这个watermark的意思是，任何小于watermark的值的event都不会再来了，可以执行了



##### processing with event time

使用event time的原因是为了能处理迟到的数据，在watermark之后的数据



##### writing to a kafka sink



### State Management

##### state management in Flink

application和element state是很重要的角色

【keyed state】：基于特定的key保存状态，比如keyby之后，为每个都保存一份state，保存的数据类型有很多种：value，list，map，reducing，aggregate；

【operator state】：由并行的操作者保存



##### Defining states

##### Using states

##### Advanced state management

【resetting state】可以调用clear()来删除state，也可以自动reset state

使用快照和还原来保存state信息，当flink到checkpoint的时候，state会自动持久化，然后重启后还原，快照和还原方法可以被覆盖，这样可以用外部的持久化



### Use Case Project

##### Problem defination

##### computing summary counts

##### conputing activity durations



### Conclusion





## Lynda学习：Apache Flink: Exploratory Data Analytics with SQL

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









