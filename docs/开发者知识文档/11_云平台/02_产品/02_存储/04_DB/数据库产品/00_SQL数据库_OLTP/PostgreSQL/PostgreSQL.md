

```bash
$ docker run -d \
    --name my-postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -v /custom/mount:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres
```

## 网站

- [官网](https://www.postgresql.org/)
- [官网 doc](https://www.postgresql.org/docs/online-resources/)
- [官网教程网站](https://www.postgresqltutorial.com/)
- [中文官网](http://www.postgres.cn/index.php/v2/home)
- [pg专题博客网站](https://pigsty.cc/zh/blog/2021/05/24/%E5%BC%80%E7%AE%B1%E5%8D%B3%E7%94%A8%E7%9A%84pg%E5%8F%91%E8%A1%8C%E7%89%88pigsty/)
- [Postgres Full-Text Search: A Search Engine in a Database](https://blog.crunchydata.com/blog/postgres-full-text-search-a-search-engine-in-a-database)
