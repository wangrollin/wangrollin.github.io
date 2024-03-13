
- [ES 索引文档，按_id查找、更新、删除文档](https://blog.csdn.net/weixin_38932035/article/details/105703539)


es是创建索引和检索一起做，会损伤搜索性能。微信搜一搜中，搜索引擎分为在线离线两部分，离线用于创建索引，在线用于检索

## API

### 连通性测试

curl http://localhost:9201
curl http://localhost:9202

### 设置密码

bin/elasticsearch-setup-passwords interactive

### index 列表

curl -XGET 'vpc-es-headless.elastic:9200/_cat/indices?v'

### 根据 index、name 查询

curl -XGET 'vpc-es-headless.elastic:9200/app_log-2023.08.02/_search?q=name:2383'
