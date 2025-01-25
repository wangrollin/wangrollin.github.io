

## tips

CURRENT_TIMESTAMP 2024-11-25 10:44:27
CURRENT_DATE() 2024-10-10
CURRENT_TIME() 10:44:00

select CURRENT_TIMESTAMP;
select CURRENT_DATE;
select CURRENT_TIME;

SELECT to_char(CURRENT_TIMESTAMP, 'YYYY-MM-DD HH24:MI:SS');

## maven

<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.4</version>
</dependency>

org.postgresql.Driver
jdbc:postgresql://[host][:port]/[database]

## docker 启动 postgreSQL

- [dockerhub pg](https://hub.docker.com/_/postgres)

```bash

docker run -d \
  --name data-infra-postgres \
  -e POSTGRES_PASSWORD=data1nfra \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v /opt/datainfra/pgsql/data:/var/lib/pgsql/data \
  -p 5432:5432 \
  postgres:17.2

```

user: postgres
pwd: data1nfra

CREATE USER datainfra WITH SUPERUSER PASSWORD 'data1nfra';

user: datainfra
pwd: data1nfra

## docker 启动 pgadmin

- [官网](https://www.pgadmin.org/)
- [官网容器文档](https://www.pgadmin.org/download/pgadmin-4-container/)
- [dockerhub pgadmin4](https://hub.docker.com/r/dpage/pgadmin4)

```bash
docker pull dpage/pgadmin4:8.4

docker run -d \
    --name pgadmin \
    -p 5431:80 \
    -e 'PGADMIN_DEFAULT_EMAIL=user@example.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=data1nfra' \
     dpage/pgadmin4:8.4
```


## 网站

- [官网](https://www.postgresql.org/)
- [官网 doc](https://www.postgresql.org/docs/online-resources/)
- [官网教程网站](https://www.postgresqltutorial.com/)
- [中文官网](http://www.postgres.cn/index.php/v2/home)
- [pg专题博客网站](https://pigsty.cc/zh/blog/2021/05/24/%E5%BC%80%E7%AE%B1%E5%8D%B3%E7%94%A8%E7%9A%84pg%E5%8F%91%E8%A1%8C%E7%89%88pigsty/)
- [Postgres Full-Text Search: A Search Engine in a Database](https://blog.crunchydata.com/blog/postgres-full-text-search-a-search-engine-in-a-database)

