
## Lynda: Apache Spark Essential Training

### introducing apache spark

##### understanding spark

快的、普适的、面对大规模数据的处理；曾经主要用来处理数据科学的问题，但是也可以处理很多其他的东西，比如实时事件流式处理

选择spark的主要原因：

- 速度：基于内存，比mapreduce快100倍；基于硬盘，比mapreduce快10倍
- 易用性：原生支持java scala python R SQL；支持80个高级操作；并行、流式；可以在shell里交互执行，或者从其他流行的interface里执行，如 Jupyter Notebooks, Apache Zeppelin，命令行；流行的分析平台 Tableau可以使用SparkSQL直接连接
- 普适性：![image-20200405163548996](spark.assets/image-20200405163548996.png)
- 跨平台：hadoop, hbase, cassandra, mesos, hive；在spark2，可以直接使用dataframe连接关系数据库



##### origins of spark

2003：开发Nutch，分布式计算平台

2006：Yahoo雇佣原班人马，发布了hadoop；同时，google发布了java 接口的mapreduce

2008: fabebook发布Hive

「mapreduce基于java，面向批处理，很慢；Hive是mapreduce的SQL抽象包装」

2009: UCB开始开发spark

2010: spark开源 BSD license

2014: spark成为apache顶级项目



##### overview of spark components

![image-20200405164653704](spark.assets/image-20200405164653704.png)



spark core：最基础的组件，分布式任务、调度、输入输出

spark SQL: 支持标准SQL，要先在spark里创建表结构才能使用SQL；tableau可以容易集成spark；dataframes to spark is pandas to python， dataframes可以看作是一个table

spark streaming: 是micro batches；函数式架构

MLlib: apache mahout是一个基于disk的ML库，spark比它快9倍，MLlib有很多常用的ML函数

GraphX: 图处理，比如图数据库，寻找关系；是内存版的apache Giraph；基于dataframe RDD；不是一个真的图数据库实现

sparkR: 分布式dataframes；R package for spark，spark可以和R studio集成



##### where spark shines

spark的用武之地：

- data integration：ETL，把数据从一个地方挪到另一个地方，并清洗和标准化
- 机器学习：
- 实时处理：
- 推荐系统：
- BI/analytics：



应该把spark看作是一些工具的集合，而不是单独的东西

使用spark的语言排名：scala，python，sql，java，R

使用spark的产品排名：商业分析，数据仓库，实时流处理，推荐系统，日志系统



##### overview of databricks

databricks是一个基于云的运行spark的管理平台

容易搭建，让学习更简单

databricks是一个spark的实现



databricks专业术语：

- 工作区：所有文件的集合地方
- notebook：一个文件，scala python java markdown sql可以写在一个文件里
- 库：就是库
- 表：数据库中的表
- 集群：
- 任务：



网站入口：community.cloud.databricks.com



##### introduction to notebooks and pyspark

notebooks可以运行 scala python java sql

notebook里有cell，一个cell里是独立的代码



### analyzing data in spark

##### understanding data interfaces

RDD 弹性 分布式 数据集：最底层的数据api，可以看成是一个容器，来处理各种类型的数据对象

dataframe：基于RDD，但是只包含row类型；就像pandas python、table sql

dataset：最新的api，是RDD和dataframe的结合，可以像RDD那样有类型，像dataframe那样query；是spark未来的方向



统一 spark2.0 API：

![image-20200405174838742](spark.assets/image-20200405174838742.png)



dataset操作：

​	action：立刻执行

​	transformation：懒执行，只有在被action调用才执行

| action  | transformation |
| ------- | -------------- |
| show    | select         |
| count   | distinct       |
| collect | groupBy        |
| save    | sum            |
|         | orderBy        |
|         | filter         |
|         | limit          |



file: spark streaming, ETL

dataframe: spark ML

table: spark SQL



##### working with text files

schema-nerver file：普通文本

schema-later file 半结构化：Json

schema-first file 结构化：database，csv



pyspark

以下这些代码都可以在databricks已经import的文件夹里看到

```python
# Now let's create a simple list with 10000 integers
# xrange() is more memory efficient so let's use that

data = xrange(1, 10001)


# So far we've done just basic Python, now let's use Spark
# Start by using 'sc' to tell Spark we want to use the SparkContext
# Then we use parallelize() to create a Dataset and spread it across
# the cluster partitions

ds = sc.parallelize(data, 8)
# more info on parallelize here 
# help(sc.parallelize)

# show what we have in ds using the collect() action
print ds.collect() # we don't need to use "print" here, but it's better for formatting

# Let's browse the file system to start
%fs ls

# Now checkout some sample data
%fs ls /databricks-datasets/bikeSharing/README.md

# Next, read in a file and count the lines in a document
path = "/databricks-datasets/bikeSharing/README.md"
data = sc.textFile(path) # use the sc context to read in a text file
data.count()

# Take a look at the first line
data.first()

# Show the top 20 lines
data.take(20)


# read in file from above
logFile = path 

# cache the data in memory
logData = sc.textFile(logFile).cache()

# get number of times "bike" shows up
# use lambda function and lower() to convert the line to lowercase
# use count to figure out how many times this is true
numBikes = logData.filter(lambda s: 'bike' in s.lower()).count()

# show results
print("Lines with 'bike': %i" % (numBikes))

# Find a Directory with CSVs
%fs ls /databricks-datasets/Rdatasets/data-001/csv/datasets/

# Read in Directory of Files with wholeTextFiles()
# read in directory looking for anything ending in .csv
path = "/databricks-datasets/Rdatasets/data-001/csv/datasets/*.csv"

# use wholeTextFiles to get each file listed separately with {filename, content}
files = sc.wholeTextFiles(path) 

# count how many files there are
files.count()

# Convert List of Files to DataFrame
# use toDF to convert object to data frame with column names
filenames = files.toDF(['name', 'data'])

# show entire DataFrame
display(filenames)

# Show only the names using select()
display(filenames.select('name'))
```



##### loading CSV data into dataframes

```python
# Find a Directory with CSVs
%fs ls /databricks-datasets/online_retail/data-001/

# specify path
path = "/databricks-datasets/online_retail/data-001/data.csv"

# load as text，没有用sc，因为这是spark2的写法，api融合在了一起
data = spark.read.csv(path) 

# show sample
data.take(20)



# Read in Data to DataFrame with Column Headers
# read in file using csv format
df = spark.read.load(path,
                    format='com.databricks.spark.csv', 
                    header='true',
                    inferSchema='true')

# show 20 rows
display(df)



# Show Countries
# For this we'll need a few functions
display( # shows the results in a grid
   df 
    .select("Country") # chooses just the 1 column
    .distinct() # removes duplicates
    .orderBy("Country") # sorts results in ascending
)
```



##### exploring data in dataframes

```python
# Find a Directory with CSVs
%fs ls /databricks-datasets/online_retail/data-001/



# Read in Data to DataFrame with Column Headers
# specify path
path = "/databricks-datasets/online_retail/data-001/data.csv"

# read in file using csv format
df = spark.read.load(path,
                    format='com.databricks.spark.csv', 
                    header='true',
                    inferSchema='true')

# show 20 rows
display(df)



# Show DataFrame Schema
# take a look at our schema
df.printSchema()



# Select Just 1 Column
# show just the countries
df.select("Country").show()



# Remove Duplicates from Column and Sort
# For this we'll need a few functions
display( # shows the results in a grid
   df 
    .select("Country") # chooses just the 1 column
    .distinct() # removes duplicates
    .orderBy("Country") # sorts results in ascending
)



# Calculate Order Totals
display(
  df
    .select(df["InvoiceNo"],df["UnitPrice"]*df["Quantity"])
    .groupBy("InvoiceNo")
    .sum()
  )



# Inspect Results with Filter，where语句
df.filter(df["InvoiceNo"]==536596).show()



# Show Top 10 Products in the UK
display(
  df
    .select(df["Country"], df["Description"],(df["UnitPrice"]*df["Quantity"]).alias("Total"))
    .groupBy("Country", "Description")
    .sum()
    .filter(df["Country"]=="United Kingdom") # 如果用了单引号相当于赋值
    .sort("sum(Total)", ascending=False)
    .limit(10)
  )
```



##### saving your results

```python
# dataframewriter可以在spark里把dataframe作为一个表保存，如果连接了hive，会自动创建hive中的表作为已管理的表



# Read in Data to DataFrame with Column Headers
# specify path
path = "/databricks-datasets/online_retail/data-001/data.csv"

# read in file using csv format
df = spark.read.load(path,
                    format='com.databricks.spark.csv', 
                    header='true',
                    inferSchema='true')

# show 20 rows
display(df)



# Show Top Products in the UK
display(
  df
    .select(df["Country"], df["Description"],(df["UnitPrice"]*df["Quantity"]).alias("Total"))
    .groupBy("Country", "Description")
    .sum()
    .filter(df["Country"]=="United Kingdom")
    .sort("sum(Total)", ascending=False)
  )



# Calculate Product Sales by Country
r1 = df.select(df["Country"], df["Description"],(df["UnitPrice"]*df["Quantity"]).alias("Total"))

display(r1)



# Save Results as Table
r1.write.saveAsTable("product_sales_by_country")

# 相当于告诉spark，这是一个table；可以在其上运行spark SQL
```



### using Spark SQL to analyze data

##### creating tables

spark SQL的语法：

![image-20200405203502709](spark.assets/image-20200405203502709.png)



```sql
/* Find a CSV */
%fs ls /databricks-datasets/samples/population-vs-price/



/* Create Table w/o Schema */
CREATE TABLE IF NOT EXISTS population_v_price
USING CSV
OPTIONS (path "/databricks-datasets/samples/population-vs-price/data_geo.csv", header "true", inferSchema "true");

/* check results */
select * from population_v_price limit 100;




/* Create Table w/ Schema */
CREATE TABLE IF NOT EXISTS online_retail(
InvoiceNo string,
StockCode string,
Description string,
Quantity int,
InvoiceDate string,
UnitPrice double,
CustomerID int,
Country string)
USING CSV
OPTIONS (path "/databricks-datasets/online_retail/data-001/data.csv", header "true");

/* check results */
select * from online_retail limit 100;

/* 可以在databricks的table页面上传csv，通过ui创建table */
```



##### querying data with spark SQL

```sql
/* Take a look at our sale table */
select *
from cogsley_sales
limit 100;

/* Calculate Sales Totals */
select CompanyName, round(sum(SaleAmount)) as Sales
from cogsley_sales
group by CompanyName
order by 2 desc

/* Join to get Client Info */
select CompanyName, IPOYear, Symbol, round(sum(SaleAmount)) as Sales
from cogsley_sales
left join cogsley_clients on CompanyName = Name
group by CompanyName, IPOYear, Symbol
order by 1

/* Join to get State Info */
select i.StateCode, round(sum(s.SaleAmount)) as Sales
from cogsley_sales s
join state_info i on s.State = i.State
group by i.StateCode
```



##### visualizing data in databricks notebooks

```sql
/* databricks 上点点按钮，拖拽一下指标，就自动生成了 */

/* Basic Bar Chart */
select *
from cogsley_sales
limit 100;

/* Basic Line Chart */
select *
from cogsley_sales
limit 100;

/* Build a Map */
/* requires 2char state code */
select i.StateCode, round(sum(s.SaleAmount)) as Sales
from cogsley_sales s
join state_info i on s.State = i.State
group by i.StateCode

/* Box Plot (bonus!) */
select *
from cogsley_sales
limit 100;
```



### running machine learning algorithms using MLlib

##### introduction to machine learning with spark

有监督训练模型：已经知道了结果，就在训练的时候，看哪个模型最匹配

无监督训练模型：没有已知的结果，也就没有人的偏见



有监督训练模型：

​	分类：垃圾邮件分类

​	回归：变量之间的关系

无监督训练模型：

​	聚类：不同客户的聚类，事先不知道有什么种类



##### preparing data for machine learning

databricks上的社区版集群，60min不用，就会自动释放

使用spark1.6，因为不是所有的功能都上了spark2.0

```python
# Download the file with curl
%sh curl -O 'https://raw.githubusercontent.com/bsullins/bensullins.com-freebies/master/CogsleyServices-SalesData-US.csv'
# saves file to file:/databricks/driver/CogsleyServices-SalesData-US.csv



# Read in and Cleanse Data
path = 'file:/databricks/driver/CogsleyServices-SalesData-US.csv'
# path = "/databricks-datasets/samples/population-vs-price/data_geo.csv"

# Use the Spark CSV datasource with options specifying:
# - First line of file is a header
# - Automatically infer the schema of the data
data = sqlContext.read.format("csv")\
  .option("header", "true")\
  .option("inferSchema", "true")\
  .load(path)
 
data.cache() # Cache data for faster reuse
data = data.dropna() # drop rows with missing values
 
# Register table so it is accessible via SQL Context
# For Apache Spark = 2.0
# data.createOrReplaceTempView("data_geo")

display(data)



# Aggregate and Convert
# Get monthly sales totals，csv转成dataframe
summary = data.select("OrderMonthYear", "SaleAmount").groupBy("OrderMonthYear").sum().orderBy("OrderMonthYear").toDF("OrderMonthYear","SaleAmount")

# Convert OrderMonthYear to integer type
results = summary.map(lambda r: (int(r.OrderMonthYear.replace('-','')), r.SaleAmount)).toDF(["OrderMonthYear","SaleAmount"])



# Convert DataFrame to Features and Labels
# convenience for specifying schema
# feature.value = x, lable = y; LabeledPoint(y,x)
from pyspark.mllib.regression import LabeledPoint
 
data = results.select("OrderMonthYear", "SaleAmount")\
  .map(lambda r: LabeledPoint(r[1], [r[0]]))\
  .toDF()
  
display(data)
```



##### building a linear regression model

```python
# Download the file with curl
%sh curl -O 'https://raw.githubusercontent.com/bsullins/bensullins.com-freebies/master/CogsleyServices-SalesData-US.csv'
# saves file to file:/databricks/driver/CogsleyServices-SalesData-US.csv



# Read in and Cleanse Data
path = 'file:/databricks/driver/CogsleyServices-SalesData-US.csv'
# path = "/databricks-datasets/samples/population-vs-price/data_geo.csv"

# Use the Spark CSV datasource with options specifying:
# - First line of file is a header
# - Automatically infer the schema of the data
data = sqlContext.read.format("csv")\
  .option("header", "true")\
  .option("inferSchema", "true")\
  .load(path)
 
data.cache() # Cache data for faster reuse
data = data.dropna() # drop rows with missing values
 
# Register table so it is accessible via SQL Context
# For Apache Spark = 2.0
# data.createOrReplaceTempView("data_geo")

display(data)



# Aggregate and Convert
# Get monthly sales totals
summary = data.select("OrderMonthYear", "SaleAmount").groupBy("OrderMonthYear").sum().orderBy("OrderMonthYear").toDF("OrderMonthYear","SaleAmount")

# Convert OrderMonthYear to integer type
results = summary.map(lambda r: (int(r.OrderMonthYear.replace('-','')), r.SaleAmount)).toDF(["OrderMonthYear","SaleAmount"])



# Convert DataFrame to Features and Labels
# convenience for specifying schema
from pyspark.mllib.regression import LabeledPoint
 
data = results.select("OrderMonthYear", "SaleAmount")\
  .map(lambda r: LabeledPoint(r[1], [r[0]]))\
  .toDF()
  
display(data)



# Build Linear Regression Model
# Import LinearRegression class
from pyspark.ml.regression import LinearRegression
 
# Define LinearRegression algorithm
lr = LinearRegression()
 
# Fit 2 models, using different regularization parameters
modelA = lr.fit(data, {lr.regParam:0.0})
modelB = lr.fit(data, {lr.regParam:100.0})

# Make predictions
predictionsA = modelA.transform(data)
predictionsB = modelB.transform(data)

display(predictionsA)
```



##### evaluating a linear regression model

```python
# Download the file with curl
%sh curl -O 'https://raw.githubusercontent.com/bsullins/bensullins.com-freebies/master/CogsleyServices-SalesData-US.csv'
# saves file to file:/databricks/driver/CogsleyServices-SalesData-US.csv



# Read in and Cleanse Data
path = 'file:/databricks/driver/CogsleyServices-SalesData-US.csv'
# path = "/databricks-datasets/samples/population-vs-price/data_geo.csv"

# Use the Spark CSV datasource with options specifying:
# - First line of file is a header
# - Automatically infer the schema of the data
data = sqlContext.read.format("csv")\
  .option("header", "true")\
  .option("inferSchema", "true")\
  .load(path)
 
data.cache() # Cache data for faster reuse
data = data.dropna() # drop rows with missing values
 
# Register table so it is accessible via SQL Context
# For Apache Spark = 2.0
# data.createOrReplaceTempView("data_geo")

display(data)



# Aggregate and Convert
# Get monthly sales totals
summary = data.select("OrderMonthYear", "SaleAmount").groupBy("OrderMonthYear").sum().orderBy("OrderMonthYear").toDF("OrderMonthYear","SaleAmount")

# Convert OrderMonthYear to integer type
results = summary.map(lambda r: (int(r.OrderMonthYear.replace('-','')), r.SaleAmount)).toDF(["OrderMonthYear","SaleAmount"])



# Convert DataFrame to Features and Labels
# convenience for specifying schema
from pyspark.mllib.regression import LabeledPoint
 
data = results.select("OrderMonthYear", "SaleAmount")\
  .map(lambda r: LabeledPoint(r[1], [r[0]]))\
  .toDF()
  
display(data)



# Build Linear Regression Model
# Import LinearRegression class
from pyspark.ml.regression import LinearRegression
 
# Define LinearRegression algorithm
lr = LinearRegression()
 
# Fit 2 models, using different regularization parameters
modelA = lr.fit(data, {lr.regParam:0.0})
modelB = lr.fit(data, {lr.regParam:100.0})

# Make predictions
predictionsA = modelA.transform(data)
predictionsB = modelB.transform(data)

display(predictionsA)



# Check Models for Accuracy
from pyspark.ml.evaluation import RegressionEvaluator
evaluator = RegressionEvaluator(metricName="rmse")

RMSE = evaluator.evaluate(predictionsA)
print("ModelA: Root Mean Squared Error = " + str(RMSE)) 

RMSE = evaluator.evaluate(predictionsB)
print("ModelB: Root Mean Squared Error = " + str(RMSE))
```



##### visualizing a linear regression model

```python
# Download the file with curl
%sh curl -O 'https://raw.githubusercontent.com/bsullins/bensullins.com-freebies/master/CogsleyServices-SalesData-US.csv'
# saves file to file:/databricks/driver/CogsleyServices-SalesData-US.csv



# Read in and Cleanse Data
path = 'file:/databricks/driver/CogsleyServices-SalesData-US.csv'
# path = "/databricks-datasets/samples/population-vs-price/data_geo.csv"

# Use the Spark CSV datasource with options specifying:
# - First line of file is a header
# - Automatically infer the schema of the data
data = sqlContext.read.format("csv")\
  .option("header", "true")\
  .option("inferSchema", "true")\
  .load(path)
 
data.cache() # Cache data for faster reuse
data = data.dropna() # drop rows with missing values
 
# Register table so it is accessible via SQL Context
# For Apache Spark = 2.0
# data.createOrReplaceTempView("data_geo")

display(data)



# Aggregate and Convert
# Get monthly sales totals
summary = data.select("OrderMonthYear", "SaleAmount").groupBy("OrderMonthYear").sum().orderBy("OrderMonthYear").toDF("OrderMonthYear","SaleAmount")

# Convert OrderMonthYear to integer type
results = summary.map(lambda r: (int(r.OrderMonthYear.replace('-','')), r.SaleAmount)).toDF(["OrderMonthYear","SaleAmount"])



# Convert DataFrame to Features and Labels
# convenience for specifying schema
from pyspark.mllib.regression import LabeledPoint
 
data = results.select("OrderMonthYear", "SaleAmount")\
  .map(lambda r: LabeledPoint(r[1], [r[0]]))\
  .toDF()
  
display(data)



# Build Linear Regression Model
# Import LinearRegression class
from pyspark.ml.regression import LinearRegression
 
# Define LinearRegression algorithm
lr = LinearRegression()
 
# Fit 2 models, using different regularization parameters
modelA = lr.fit(data, {lr.regParam:0.0})
modelB = lr.fit(data, {lr.regParam:100.0})

# Make predictions
predictionsA = modelA.transform(data)
predictionsB = modelB.transform(data)

display(predictionsA)



# Check Models for Accuracy
from pyspark.ml.evaluation import RegressionEvaluator
evaluator = RegressionEvaluator(metricName="rmse")
RMSE = evaluator.evaluate(predictionsA)
print("ModelA: Root Mean Squared Error = " + str(RMSE)) 

RMSE = evaluator.evaluate(predictionsB)
print("ModelB: Root Mean Squared Error = " + str(RMSE))



# Create Tables with Predictions

# define column names
cols = ["OrderMonthYear", "SaleAmount", "Prediction"]

# use parallelize to create an RDD
# use map() with lambda to parse features
tableA = sc.parallelize(\
            predictionsA.map(lambda r: (float(r.features[0]), r.label, r.prediction)).collect()\
         ).toDF(cols) 

# repeate for modelB
tableB = sc.parallelize(\
            predictionsB.map(lambda r: (float(r.features[0]), r.label, r.prediction)).collect()\
         ).toDF(cols) 

# check results
# display(tableA)

# save results as tables
tableA.write.saveAsTable('predictionsA', mode='overwrite')
print "Created predictionsA table"

tableB.write.saveAsTable('predictionsB', mode='overwrite')
print "Created predictionsB table"



# Simple Visualization
%sql 
select 
    a.OrderMonthYear,
    a.SaleAmount,
    a.prediction as ModelA,
    b.prediction as ModelB
from predictionsA a
join predictionsB b on a.OrderMonthYear = b.OrderMonthYear
```



### real-time data analysis with Spark Streaming

##### introduction to streaming analytics

micro bath



##### streaming context setup

```python
# Download Sales Data
%sh 
curl -O 'https://raw.githubusercontent.com/bsullins/bensullins.com-freebies/master/sales_log.zip'
file sales_log.zip

%sh unzip sales_log.zip

%fs ls 'file:/databricks/driver/sales_log/'



# Read in Data
from pyspark.sql.types import *

path = "file:/databricks/driver/sales_log/"

# create schema for data so stream processing is faster
salesSchema = StructType([
  StructField("OrderID", DoubleType(), True),
  StructField("OrderDate", StringType(), True),
  StructField("Quantity", DoubleType(), True),
  StructField("DiscountPct", DoubleType(), True),
  StructField("Rate", DoubleType(), True),
  StructField("SaleAmount", DoubleType(), True),
  StructField("CustomerName", StringType(), True),
  StructField("State", StringType(), True),
  StructField("Region", StringType(), True),
  StructField("ProductKey", StringType(), True),
  StructField("RowCount", DoubleType(), True),
  StructField("ProfitMargin", DoubleType(), True)])

# Static DataFrame containing all the files in sales_log
data = (
  spark
    .read
    .schema(salesSchema)
    .csv(path)
)

# create table so we can use SQL, temp的不会存在于table菜单里
data.createOrReplaceTempView("sales")

display(data)



# Check Table，在python notebook里使用sql，需要加%sql
%sql select * from sales



# Build a Chart
%sql 
select 
  ProductKey as Products,
  round(sum(SaleAmount)) as TotalSales
from sales
group by ProductKey
order by 2 desc
limit 100



# Streaming Setup
from pyspark.sql.functions import *

# Similar to definition of staticInputDF above, just using `readStream` instead of `read`
streamingInputDF = (
  spark
    .readStream                       
    .schema(salesSchema)              # Set the schema for our feed
    .option("maxFilesPerTrigger", 1)  # Treat a sequence of files as a stream by picking one file at a time
    .csv(path)
)

# Same query as staticInputDF
streamingCountsDF = (                 
  streamingInputDF
    .select("ProductKey", "SaleAmount")
    .groupBy("ProductKey")
    .sum()
)

# Is this DF actually a streaming DF?
streamingCountsDF.isStreaming
```



##### querying streaming data

```python
# Download Sales Data
%sh 
curl -O https://raw.githubusercontent.com/bsullins/bensullins.com-freebies/master/sales_log.zip
file sales_log.zip

%sh unzip sales_log.zip

# If already exists, check directory
%fs ls 'file:/databricks/driver/sales_log/'



# Read in Data
from pyspark.sql.types import *

path = "file:/databricks/driver/sales_log/"

# create schema for data so stream processing is faster
salesSchema = StructType([
  StructField("OrderID", DoubleType(), True),
  StructField("OrderDate", StringType(), True),
  StructField("Quantity", DoubleType(), True),
  StructField("DiscountPct", DoubleType(), True),
  StructField("Rate", DoubleType(), True),
  StructField("SaleAmount", DoubleType(), True),
  StructField("CustomerName", StringType(), True),
  StructField("State", StringType(), True),
  StructField("Region", StringType(), True),
  StructField("ProductKey", StringType(), True),
  StructField("RowCount", DoubleType(), True),
  StructField("ProfitMargin", DoubleType(), True)])

# Static DataFrame containing all the files in sales_log
data = (
  spark
    .read
    .schema(salesSchema)
    .csv(path)
)

# create table so we can use SQL
data.createOrReplaceTempView("sales")

display(data)



# Check Table
%sql select * from sales

# Build a Chart
%sql 
select 
  ProductKey as Products,
  round(sum(SaleAmount)) as TotalSales
from sales
group by ProductKey
order by 2 desc
limit 100



# Streaming Setup
from pyspark.sql.functions import *

# Similar to definition of staticInputDF above, just using `readStream` instead of `read`
streamingInputDF = (
  spark
    .readStream                       
    .schema(salesSchema)              # Set the schema for our feed
    .option("maxFilesPerTrigger", 1)  # Treat a sequence of files as a stream by picking one file at a time
    .csv(path)
)

# Same query as staticInputDF
streamingCountsDF = (                 
  streamingInputDF
    .select("ProductKey", "SaleAmount")
    .groupBy("ProductKey")
    .sum()
)

# Is this DF actually a streaming DF?
streamingCountsDF.isStreaming



# Create Streaming Table
query = (
  streamingCountsDF
    .writeStream
    .format("memory")        # memory = store in-memory table (for testing only in Spark 2.0)
    .queryName("sales_stream")     # counts = name of the in-memory table
    .outputMode("complete")  # complete = all the counts should be in the table
    .start()
)

%sql 
select *  
from sales_stream
order by 2 desc
limit 100

# 重大发现，这里的stream的聚合不是针对时间窗的，像flink那样，而是针对所有已有的数据的
```



### connecting BI tools to spark

##### setting up spark locally

```python
# 去apache spark官网下载spark

# 解压，执行
./bin/pyspark

sc
```



##### connecting Jupyter notebooks to spark

安装Anaconda2

conda install jupyter

conda update jupyter



```bash
For Mac:

# 1) Set path for Spark and adjust to the correct path to Spark
echo “export PATH=$PATH:/path_to_downloaded_spark/spark-1.6.0/bin” >> .profile

# 2) Setting up PySpark driver
echo “export PYSPARK_DRIVER_PYTHON=ipython” >> .profile

# 3) Specifies PySpark options
echo “export PYSPARK_DRIVER_PYTHON_OPTS=‘notebook’ pyspark” >> .profile

source .profile

cd /notebook
pyspark 自动打开jupyter网页


# For Windows
# 1) Puts Spark in a path variable so you can execute commandlets from that directory.  Adjust to your own directory.
$env:Path += “;C:\Users\bsullins\spark\bin\”

# 2) Set vars for PySpark
$env:PYSPARK_DRIVER_PYTHON=“ipython”

# 3) Specifies PySpark options
$env:PYSPARK_DRIVER_PYTHON_OPTS=“notebook”

# Enter in the following commands instead of source .profile
cd ../
cd .\notebooks\
pyspark
```



##### other connection options

| BI Tools  |
| :-------: |
| JDBC/ODBC |
| Spark SQL |



### conclusion
