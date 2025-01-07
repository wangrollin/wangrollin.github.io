



[Neo4j Migrations](https://github.com/michael-simons/neo4j-migrations) is used instead of [Liquibase](http://www.liquibase.org/) to manage database changes.



- Embedded Mode（内存+磁盘？）
- CS Mode（磁盘？）

## 容器化部署

docker run -d -it \
    --publish=7474:7474 --publish=7687:7687 \
    --env=NEO4J_AUTH=none \
    --volume=$HOME/neo4j/data:/data \
    neo4j


