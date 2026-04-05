
## Lynda: Apache Flink: Batch Mode Data Engineering

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
