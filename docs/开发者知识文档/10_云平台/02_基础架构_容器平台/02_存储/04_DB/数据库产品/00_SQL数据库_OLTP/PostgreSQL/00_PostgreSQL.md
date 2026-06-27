

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
sudo mkdir -p /opt/jarvis/pgdata

sudo podman run -d \
   --name postgres \
   -e POSTGRES_PASSWORD=yourpassword \
   -e POSTGRES_USER=myuser \
   -e POSTGRES_DB=mydb \
   -p 5432:5432 \
   -v /opt/jarvis/pgdata:/var/lib/postgresql:Z \
   postgres:18
```

**用户信息**

user: postgres
pwd: data1nfra

CREATE USER datainfra WITH SUPERUSER PASSWORD 'data1nfra';

user: datainfra
pwd: data1nfra

**:Z 是什么的缩写？代表什么含义？**

⏺ :Z 代表 SELinux relabel，大写 Z 表示 private unshared label。

  实际上有两个选项：

  ┌──────┬──────────────────────────────────────┐
  │ 标签 │                 含义                 │
  ├──────┼──────────────────────────────────────┤
  │ :z   │ shared — 多个容器可以共享访问该目录  │
  ├──────┼──────────────────────────────────────┤
  │ :Z   │ private — 只有当前容器可以访问该目录 │
  └──────┴──────────────────────────────────────┘

  加了 :Z 后，Podman 会自动执行类似这样的操作：

  chcon -Rt svirt_sandbox_file_t /opt/jarvis/pgdata

  把目录的 SELinux 标签改成容器可以访问的类型。

  数据库目录用 :Z（大写）是对的，因为只有一个 postgres 容器需要访问它。

**加了 :Z，还需要使用 root模式启动podman容器吗？**

⏺ 两者是独立的问题：

  - :Z 解决的是 SELinux 权限
  - sudo 解决的是 Linux 用户权限

  你的场景挂载的是 /opt/jarvis/pgdata（系统目录，通常属于 root），建议还是用 sudo。

  如果你想用 rootless 模式，就需要确保当前用户对 /opt/jarvis/pgdata 有读写权限：

  sudo chown -R $(id -u):$(id -g) /opt/jarvis/pgdata

  但既然是数据库生产服务，sudo podman + :Z 最省心。

**搭配systemd做自动重启**
不要加 --restart=always，两者会冲突：容器崩溃时 systemd 想重启，Podman 也想重启，可能互相打架导致异常

```bash
# 生成 systemd 服务
podman generate systemd --name postgres --files --new

# systemd root 模式
mv container-postgres.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now container-postgres.service
```

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

