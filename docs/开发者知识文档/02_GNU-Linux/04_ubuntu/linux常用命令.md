# linux常用命令

## 查看系统信息

```bash
# 总核数 = 物理CPU个数 X 每颗物理CPU的核数

\# 总逻辑CPU数 = 物理CPU个数 X 每颗物理CPU的核数 X 超线程数

 

\# 查看物理CPU个数

cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l

 

\# 查看每个物理CPU中core的个数(即核数)

cat /proc/cpuinfo| grep "cpu cores"| uniq

 

\# 查看逻辑CPU的个数

cat /proc/cpuinfo| grep "processor"| wc -l

复制代码

查看CPU信息（型号）
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c

查看内 存信息
\# cat /proc/meminfo


# scp
sudo scp name@hostname:/etc/apt/source.list /etc/apt/source.list
sudo scp name@hostname:/ /
```

## 小tips

```bash

# 一直yes
xxx -y


```
