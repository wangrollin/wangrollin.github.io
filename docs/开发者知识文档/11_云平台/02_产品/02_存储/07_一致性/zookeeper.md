
## 网页

- [官网](https://zookeeper.apache.org/)
- [zkCli 命令](https://zookeeper.apache.org/doc/r3.6.0/zookeeperCLI.html)
- [github](https://github.com/apache/zookeeper)
- [用大白话给你解释 ZooKeeper 的选举机制](http://dockerone.com/article/696772)
- [ZooKeeper 定位：能解决什么问题？](https://ningg.top/zookeeper-positioning/)
- [ZooKeeper集群架构以及读写原理](https://mp.weixin.qq.com/s/F5cS-W4WyuRwc8dGPVy0dQ)

- Zab协议
- 数据一致性与 paxos 算法


## 介绍

ZooKeeper 是存储设施，但特别注意：

ZK上存储的数据聚焦为：协作数据（元数据），而不是应用数据，应用数据有自己的存储方案，例如 HDFS 等

ZK 本质上，可以看作一种特殊的 FS

## 命令行

下载 https://zookeeper.apache.org/releases.html 二进制版本，否则会报错找不到主类，进入 bin 目录

```bash
./zkCli.sh -server localhost:2181
ls /xxx/xxx
get /xxx/xxx
```


### Zookeeper 的数据模型

- 层次化的目录结构，命名符合常规文件系统规范
- 每个节点在zookeeper中叫做znode,并且其有一个唯一的路径标识
- 节点Znode可以包含数据和子节点，但是EPHEMERAL类型的节点不能有子节点
- Znode中的数据可以有多个版本，比如某一个路径下存有多个数据版本，那么查询这个路径下的数据就需要带上版本
- 客户端应用可以在节点上设置监视器
- 节点不支持部分读写，而是一次性完整读写

### Zookeeper 的节点

- Znode有两种类型，短暂的（ephemeral）和持久的（persistent）
- Znode的类型在创建时确定并且之后不能再修改
- 短暂znode的客户端会话结束时，zookeeper会将该短暂znode删除，短暂znode不可以有子节点
- 持久znode不依赖于客户端会话，只有当客户端明确要删除该持久znode时才会被删除
- Znode有四种形式的目录节点
- PERSISTENT（持久的）
- EPHEMERAL(暂时的)
- PERSISTENT_SEQUENTIAL（持久化顺序编号目录节点）
- EPHEMERAL_SEQUENTIAL（暂时化顺序编号目录节点）

