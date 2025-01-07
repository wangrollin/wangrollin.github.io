
## 添加到 sudo 组中

usermod -aG sudo user-name

-a 表示追加

usermod -aG group_name user_name


## 编辑方式添加sudo权限

免密sudo

```shell
visudo
user-name       ALL=(ALL)       NOPASSWD: ALL
```
