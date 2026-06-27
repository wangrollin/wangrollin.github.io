# ubuntu

修改hostname: 

```bash
sudo hostnamectl set-hostname new-name
sudo hostnamectl set-hostname wechat-big-data1
sudo reboot
```

hostname 全部用字母



开启远程ssh

sudo apt-get install openssh-server



切换成root权限

sudo -i



安装java

sudo apt-get update

sudo apt-get install default-jdk



查看java版本

sudo update-alternatives --config java



## 查看ubuntu版本

cat /etc/issue



## ubuntu apt换源

https://zhuanlan.zhihu.com/p/27187622

```bash
# 备份一下
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
# 将文档里面所有的内容删除，换成下面的
sudo vi /etc/apt/sources.list


# 18.04LTS 清华镜像
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```


## 安装桌面和远程登录

sudo apt-get update -y
sudo apt-get install ubuntu-desktop -y
reboot


## 安装ZFS

64-bit architectures

推荐8G ram 最小2G

```bash
https://wiki.ubuntu.com/Kernel/Reference/ZFS

sudo apt install zfsutils-linux

sudo dd if=/dev/zero of=hadoop-zfs1.img bs=1M seek=100000 count=0
sudo zfs create hadoop-pool ~/hadoop-zfs1.img # 创建pool的时候自动把pool挂载到/目录
sudo zfs set compression=lz4 hadoop-pool

sudo umount /hadoop-pool
sudo zpool create hadoop-pool /dev/sda3 -f
sudo zfs set compression=lz4 hadoop-pool

sudo zfs get all hadoop-pool
sudo zpool status hadoop-pool

# 快照会占用存储池空间
sudo zfs snapshot -r hadoop-pool@hadoop-init-snap
sudo zfs list -t snapshot
sudo zfs rollback hadoop-pool@hadoop-init-snap
sudo zfs destroy hadoop-pool@hadoop-init-snap
```





## 安装docker

https://yq.aliyun.com/articles/110806?spm=5176.8351553.0.0.598e1991KP24Ab

Docker CE 镜像源站，使用官方安装脚本自动安装 （仅适用于公网环境）

```bash
sudo apt install docker.io

curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

# 默认只有root权限才能使用docker，不用root使用docker
sudo usermod -aG docker wangrollin
sudo usermod -aG docker dex
sudo usermod -aG docker $USER
```




## rpm包转成deb包

https://www.cnblogs.com/cnblogsfans/archive/2010/01/03/1638144.html

Ubuntu的软件包格式是deb，如果要安装rpm的包，则要先用alien把rpm转换成deb。

sudo apt-get install alien #alien默认没有安装，所以首先要安装它

sudo alien xxxx.rpm #将rpm转换位deb，完成后会生成一个同名的xxxx.deb

sudo dpkg -i xxxx.deb #安装



## ssh连不上ubuntu

之前连接过该host，在/Users/wangrollin/.ssh/known_hosts里保存了hostname-pub-key，删掉对应的记录，重新连接就可以了

```bash
cd /Users/wangrollin/.ssh
open .
```





