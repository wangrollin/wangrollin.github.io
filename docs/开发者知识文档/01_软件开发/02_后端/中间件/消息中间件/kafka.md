

## 常用命令行

```bash

# kafka-consumer-groups
# 查看kafka topic列表
kafka-topics --zookeeper kafka-zookeeper-headless:2181 --list


# kafka-consumer-groups
# 查看consumer group 列表
kafka-consumer-groups --bootstrap-server kafka-broker-export:9092 --list
# 查看某个consumer group的具体信息
kafka-consumer-groups --bootstrap-server kafka-broker-export:9092 --describe --group com.example.wechat


# kafka-console-consumer
# 查看某个topic的消息
kafka-console-consumer --bootstrap-server kafka-broker-export:9092 --topic trackTopicDEV --from-beginning
kafka-console-consumer --bootstrap-server kafka-broker-export:9092 --topic trackTopicDEV


```

