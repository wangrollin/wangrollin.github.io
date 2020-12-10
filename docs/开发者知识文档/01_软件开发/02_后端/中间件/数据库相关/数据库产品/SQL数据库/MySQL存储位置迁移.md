# MySQL存储位置迁移

### 一、查看mysql存储路径
```sql
mysql -u root -p
show global variables like "%datadir%"; -- 查询路径 一般是该路径 /var/lib/mysql
```
### 二、迁徙步骤
1、创建新的目录
```bash
mkdir /data/mysql
mkdir /data/tmp
```
2、mv或cp原始数据库数据目录文件，这里我用的是cp，为了安全考虑，直接复制一份，如果失败原始数据不会影响，可以快速回滚到之前的目录启动数据库
```bash
cp -a /var/lib/mysql /data/mysql
```
3、修改配置文件my.cnf
```bash
备份my.cnf
cp /etc/my.cnf /etc/my.cnfbak

编辑配置文件
vim /etc/my.cnf
datadir=/data/mysql
socket=/data/mysql/mysql.sock
tmpdir=/data/tmp

修改配置
vim /etc/init.d/mysqld
datadir=/data/mysql

给文件夹权限
chmod -R 777 /data

建立软链接
ln -s /data/mysql/mysql.sock /var/lib/mysql/mysql.sock
如果报错：ln: failed to create symbolic link ‘/var/lib/mysql/mysql.sock’: File exists
cd /var/lib/mysql
mv mysql.sock mysql.sockBak

重启mysql
systemctl stop mysqld
systemctl start mysqld
```
注意事项：
```bash
cat /var/log/mysqld.log   ---查看数据库启动日志
```
