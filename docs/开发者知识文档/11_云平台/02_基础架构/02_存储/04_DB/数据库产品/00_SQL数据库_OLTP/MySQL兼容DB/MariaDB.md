

- [官网](https://mariadb.com/)




docker run --detach --name cm-mariadb2 -p 3307:3306 --env MARIADB_USER=wrl_write --env MARIADB_PASSWORD=EgTBqjxP6lQ9zm9XSidFsKzlE51kSXcd --env MARIADB_ROOT_PASSWORD=EgTBqjxP6lQ9zm9XSidFsKzlE51kSXcd mariadb:10.3


## 最大连接数

配置的数量
SHOW VARIABLES LIKE 'max_connections';
当前连接的数量
SHOW STATUS LIKE 'Threads_connected';

临时修改，重启后失效
SET GLOBAL max_connections = 3000;
修改后重启，长久有效
/etc/my.cnf 或 /etc/mysql/my.cnf