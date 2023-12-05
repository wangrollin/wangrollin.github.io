

## deploy mode（主要问题是 driver 在哪）

### client mode（测试模式）

driver 在本地，方便看日志，数据传输比较耗时间，目的是调试，cli 终端，远端 executor 也会中断

### cluster mode（生产模式）

driver 和 executor 在一起


## Cluster Manager Types（主要问题是 cluster manager 类型）

#### spark standalone

相当于干了 yarn 或者 k8s 的资源分配的活，并不是一个 node，而可以是多个 node

./sbin/start-master.sh

- master url：spark://HOST:PORT
- master web ui：http://localhost:8080 by default.

./sbin/start-worker.sh <master-spark-URL>

cluster launch scripts
- conf/workers

cluster config
- conf/spark-env.sh

高可用模式
- Standby Masters with ZooKeeper
- Single-Node Recovery with Local File System


#### yarn

HADOOP_CONF_DIR or YARN_CONF_DIR

```bash
./bin/spark-submit --class path.to.your.Class --master yarn --deploy-mode cluster [options] <app jar> [app options]

./bin/spark-submit --class org.apache.spark.examples.SparkPi \
    --master yarn \
    --deploy-mode cluster \
    --driver-memory 4g \
    --executor-memory 2g \
    --executor-cores 1 \
    --queue thequeue \
    examples/jars/spark-examples*.jar \
    10
```

yarn containers
- Application Master
- executors

- Spark history server UI
- MapReduce history server（看日志）

yarn logs -applicationId <app ID>

#### k8s

uid

```bash
./bin/spark-submit \
    --master k8s://https://<k8s-apiserver-host>:<k8s-apiserver-port> \
    --deploy-mode cluster \
    --name spark-pi \
    --class org.apache.spark.examples.SparkPi \
    --conf spark.executor.instances=5 \
    --conf spark.kubernetes.container.image=<spark-image> \
    local:///path/to/examples.jar
```

local:// 代表文件在本地
file:// or none 代表文件在 spark-submit 所在机器

```bash
--packages org.apache.hadoop:hadoop-aws:3.2.2
--conf spark.kubernetes.file.upload.path=s3a://<s3-bucket>/path
--conf spark.hadoop.fs.s3a.access.key=...
--conf spark.hadoop.fs.s3a.impl=org.apache.hadoop.fs.s3a.S3AFileSystem
--conf spark.hadoop.fs.s3a.fast.upload=true
--conf spark.hadoop.fs.s3a.secret.key=....
--conf spark.driver.extraJavaOptions=-Divy.cache.dir=/tmp -Divy.home=/tmp
file:///full/path/to/app.jar
```

文件会上传到 s3

```bash
spark-submit --kill spark:spark-pi-1547948636094-driver --master k8s://https://192.168.2.8:8443

spark-submit --status spark:spark-pi-1547948636094-driver --master  k8s://https://192.168.2.8:8443

spark-submit --kill spark:spark-pi* --master  k8s://https://192.168.2.8:8443
```

##### spark-on-k8s-operator

- [spark-operator youtube](https://www.youtube.com/watch?v=muTqsay1ix4&t=5s)
- [GoogleCloudPlatform/spark-on-k8s-operator github](https://github.com/GoogleCloudPlatform/spark-on-k8s-operator)
- [GoogleCloudPlatform/spark-on-k8s-operator doc](https://github.com/GoogleCloudPlatform/spark-on-k8s-operator/tree/master/docs)

这种模式相当于是：spark standalone + k8s 自定义资源 > native spark on k8s

sparkCluster
sparkApplication
sparkHistoryServer


## spark-class

./bin/spark-class org.apache.spark.deploy.Client kill <master url> <driver ID>


## spark-shell

./bin/spark-shell --master spark://IP:PORT


## spark-submit

### dependency

- fat jar，without spark and hadoop (provided)
- --py-files

```bash
./bin/spark-submit \
  --class <main-class> \
  --master <master-url> \
  --deploy-mode <deploy-mode> \
  --conf <key>=<value> \
  ... # other options
  <application-jar> \
  [application-arguments]
```

### config file

conf/spark-defaults.conf

优先级
var conf = new SparkConf().setMaster(...).setAppName(xxx).set("xxx","xxx")
var sc = new SparkContext(conf)
spark-submit flag
default conf

### debug config

spark-submit --verbose
能够看到哪个config来自于哪里


## topologic

- app
  - job1 (spark action)
    - stage1 (upstream)
      - task1
      - task2
    - stage2 (downstream)
  - job2 (spark action)


## monitor

### Spark Web UI

- [Spark Web UI详解](https://blog.csdn.net/qq_27639777/article/details/81069893)

每个 spark context 都有一个web ui，生命周期和任务运行一样，地址是 default driver_node:4040，如果有多个 Job，就是4041，4042

### Spark History Server


## spark security

cluster 鉴权



