
## mysql docker

```bash
docker run --name docker-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql
```

## 登录命令

```bash
mysql -u root -p -P 3306
```



## 看允许登录的IP范围

https://cloud.tencent.com/developer/news/201704


## 乐观锁，悲观锁