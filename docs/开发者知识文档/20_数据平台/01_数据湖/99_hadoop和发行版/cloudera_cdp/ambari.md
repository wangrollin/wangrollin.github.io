

## hbase client Java Api访问hbase报错



Wed Apr 01 16:42:34 CST 2020, RpcRetryingCaller{globalStartTime=1585730554104, pause=100, retries=35}, org.apache.hadoop.hbase.MasterNotRunningException: org.apache.hadoop.hbase.MasterNotRunningException: The node /hbase is not in ZooKeeper. It should have been written by the master. Check the value configured in 'zookeeper.znode.parent'. There could be a mismatch with the one configured in the master.



原因：安装hbase时，高级选项中的ZooKeeper Znode Parent不能用默认的//hbase-unsecure，要改为/hbase







## ambari 2.7.5 源码编译

编译方式：

https://ambari.apache.org/inusername.html

https://zhuanlan.zhihu.com/p/101940942?utm_source=wechat_session&utm_medium=social&utm_oi=772961945539080192&from=groupmessage&isappinstalled=0

https://blog.csdn.net/jiajane/article/details/103952426

https://blog.csdn.net/ZhouyuanLinli/article/details/79399287



## ambari 2.7.4 apt方式安装hadoop及其他组件 (此种方式没有 高可用事务方式同步元数据 和 联邦namenode)

https://docs.cloudera.com/HDPDocuments/Ambari-2.7.4.0/bk_ambari-installation/content/



### 1 加源

```bash
sudo wget -O /etc/apt/sources.list.d/ambari.list http://public-repo-1.hortonworks.com/ambari/ubuntu18/2.x/updates/2.7.4.0/ambari.list

sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com B9733A7A07513CAD

sudo apt-get update
```



### 2 安装ambari-server ambari-agent

```bash
sudo apt-get install ambari-server
sudo apt-get install ambari-agent
sudo ambari-server setup # 使用oracle的jdk
sudo ambari-server start
sudo ambari-agent start
# 访问8080 默认账号 admin admin

sudo ambari-server stop
sudo ambari-server reset
sudo rm -rf /hadoop-pool/*
sudo ambari-server start

sudo ambari-agent stop
sudo ambari-agent reset example.com
sudo ambari-agent start

```



### 3 host上做一些设置


```bash
# 网络设置
sudo ufw disable
sudo iptables -X
sudo iptables -t nat -F
sudo iptables -t nat -X
sudo iptables -t mangle -F
sudo iptables -t mangle -X
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT


# ntp设置
sudo apt-get install ntp
update-rc.d ntp defaults


# hostname设置
sudo vi /etc/hosts
10.72.0.95 example.com

sudo hostname example.com
hostname -f

sudo mkdir -p /etc/sysconfig
sudo vi /etc/sysconfig/network
NETWORKING=yes
HOSTNAME=example.com
```



### 4 加ssh pub key

```bash
# 可以使用username
ssh-keygen
# 把.ssh/id_rsa.pub放到另外几台host的authorized_keys里
scp ~/.ssh/id_rsa.pub username@example:/home/username
# 登陆每个host
sudo -i
cat /home/username/id_rsa.pub >> /root/.ssh/authorized_keys
rm /home/username/id_rsa.pub

#尝试登陆
ssh root@example
```



### 5 ambari web设置



#### web添加ssh key file

```bash
scp username@example1:/home/username/.ssh/id_rsa ~/Downloads
```



#### 设置nexus ubuntu apt proxy

http://config.example.com:8081/nexus/repository/hortonworks-HDP-proxy/

http://config.example.com:8081/nexus/repository/hortonworks-HDP-UTILS-proxy/

example.com



#### customize services 中最后一个tab（防止端口冲突）

yarn - advance - 53->533

```bash
netstat -anp | grep 533
```

