

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
- [中文官网](http://www.postgres.cn/index.php/v2/home)

