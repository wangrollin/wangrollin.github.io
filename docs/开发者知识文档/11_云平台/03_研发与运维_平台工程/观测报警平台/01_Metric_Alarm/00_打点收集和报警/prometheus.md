
## 概述

一个监控、告警工具


## 组件

### Prometheus Web UI

Prometheus dashboard 或者 grafana

都是通过 PromQL Query Language 来访问 http server

### alert manager

prometheus-server push alerts to alert-manager

怎么触发
- email
- slack

发给谁


### Prometheus Server

#### 时序 DB

  - 存储打点数据

因为是时序数据，所以没法写到 rdb

- local disk
- 远程fs

#### 数据检索 worker

  - 拉取打点数据，push to db

#### http server

  - 接受请求， PromQL Query Language



## 机制

targets
- app
- server
- os
- db

metrics
- 格式：人可读的、文本的
- help attributes
- type
  - counter：发生过几次
  - gauge：目前的值是多少
  - histogram：多久、多大

### 如何拿到 metrics

#### pull from http endpoint

ip/metrcis

- 得有这个接口 /metrcis
- 得有正确格式的数据

如果没有/metrcis接口，得有一个 exporter，拉取 metrcis、转换格式、开放 /metrcis 接口

#### pushgateway

如果 target 只运行一下子，就需要 push 到 pushgateway，然后 promethues pull from pushgateway

#### 对于中间件

官方/第三方 exporter list
- mysql
- es
- JMX exporter

example：监控 linux server
- 下载 node exporter
- 解压并执行

example：监控 mysql container
- exporter sidecar for mysql

#### 对于自己的应用

prometheus client sdk

#### push vs pull

push
- 网络流量大
- 监控会成为瓶颈
- 需要专门的进程来推 metrcis

pull
- 可以被多个 prometheus 实例拉
- 更方便判断服务是不是正常运行


### 配置 prometheus.yaml

- how often
- rules
  - 怎么聚合
  - 什么条件下告警
- 监控什么 target

使用服务发现找到 targets

### Prometheus 特性

好
- 可靠
- 独立存在，不依赖网络
- 即时其他基础设施挂了，也能正常工作
- 不需要额外 set-up
- 不复杂
- 只要部署到了 k8s，就会自动开始监控 k8s

不好
- 很难扩容
- 有限监控

workaround
- 增加 prometheus server 容量
- 减少 metrcis 数量

