
网络限速

```bash
# 1、安装工具
yum install iproute-tc -y  # CentOS/RHEL

# 2、配置限速规则（示例：限制到 192.168.1.100 的流量为 1Mbps）
# 清除旧规则
tc qdisc del dev eth0 root
# 创建根队列规则
tc qdisc add dev eth0 root handle 1: htb default 10
# 创建类，限速1Mbps (1000kbps)
tc class add dev eth0 parent 1: classid 1:1 htb rate 1000kbps ceil 1000kbps
# 为目标IP添加过滤器
tc filter add dev eth0 protocol ip parent 1: prio 1 u32 match ip dst 192.168.1.100 flowid 1:1

# 3、删除规则
tc qdisc del dev eth0 root
```

