

oracle公司的产品，现在开放出来了



### ZFS文件系统具有如下的特点：

> 1) 存储池
>
> ​	Zfs摒弃了传统的卷管理等复杂方式，用存储池的概念统一管理所有存储空间。
>
> 2) 自我修复功能数据保护-软raid
>
> ​	ZFS文件系统通过ZFS Mirror和 RAID-Z，在读取文件时进行校验。如果有错误则向上层汇报并自动修复错误。
>
> 3) 压缩与可变块大小
>
> ​	ZFS支持压缩功能，能够在数据写入和读取时，进行压缩和解压缩操作。可变块大小则会在文件存储时，自动设置其块大小。
>
> 4) 写时拷贝/校验和/快照
>
> 5) ARC（自适应内存缓存）与L2ARC（SSD做二级缓存）



## 详细介绍

https://pthree.org/2012/04/17/install-zfs-on-debian-gnulinux/



## wiki ubuntu

https://wiki.ubuntu.com/Kernel/Reference/ZFS

64-bit architectures

推荐8G ram 最小2G

```bash

sudo apt install zfsutils-linux

sudo umount /hadoop-pool
sudo zpool create hadoop-pool /dev/sda3 -f
sudo zfs set compression=lz4 hadoop-pool
sudo zfs get all hadoop-pool

###
sudo zpool create pool-test -m /var/lib/docker /dev/sdb /dev/sdc /dev/sdd
sudo zpool create pool-test /dev/sdb /dev/sdc /dev/sdd
sudo zpool status pool-test
sudo zpool destroy pool-test

###
sudo zpool create mypool mirror /dev/sdc /dev/sdd
sudo zpool add mypool mirror /dev/sde /dev/sdf -f

sudo zpool status

/dev/sdc, /dev/sdd, /dev/sde, /dev/sdf are the physical devices
mirror-0, mirror-1 are the VDEVs
mypool is the pool

###
sudo zpool create pool-test /home/user/example.img
sudo zpool status

/home/user/example.img is a file based VDEV
pool-test is the pool

###
Striped VDEVS   This is equivalent to RAID0. 
sudo zpool create example /dev/sdb /dev/sdc /dev/sdd /dev/sde


Mirrored VDEVs
Much like RAID1, one can use 2 or more VDEVs. For N VDEVs, one will have to have N-1 fail before data is lost. Example, creating mirrored pool with 2 VDEVs
$ sudo zpool create example mirror /dev/sdb /dev/sdc


Striped Mirrored VDEVs
Much like RAID10, great for small random read I/O. Create mirrored pairs and then stripe data over the mirrors. Example, creating striped 2 x 2 mirrored pool:
sudo zpool create example mirror /dev/sdb /dev/sdc mirror /dev/sdd /dev/sde
or:
sudo zpool create example mirror /dev/sdb /dev/sdc
sudo zpool add example mirror /dev/sdd /dev/sde


RAIDZ
Like RAID5, this uses a variable width strip for parity. Allows one to get the most capacity out of a bunch of disks with parity checking with a sacrifice to some performance. Allows a single disk failure without losing data. Example, creating a 4 VDEV RAIDZ:
$ sudo zpool create example raidz /dev/sdb /dev/sdc /dev/sdd /dev/sde


RAIDZ2
Like RAID6, with double the parity for 2 disk failures with performance similar to RAIDZ. Example, create a 2 parity 5 VDEV pool:
$ sudo zpool create example raidz2 /dev/sdb /dev/sdc /dev/sdd /dev/sde /dev/sdf


RAIDZ3
3 parity bits, allowing for 3 disk failures before losing data with performance like RAIDZ2 and RAIDZ. Example, create a 3 parity 6 VDEV pool:
$ sudo zpool create example raidz3 /dev/sdb /dev/sdc /dev/sdd /dev/sde /dev/sdf /dev/sdg


Nested RAIDZ
Like RAID50, RAID60, striped RAIDZ volumes. This is better performing than RAIDZ but at the cost of reducing capacity. Example, 2 x RAIDZ:
$ sudo zpool create example raidz /dev/sdb /dev/sdc /dev/sdd /dev/sde
$ sudo zpool add example raidz /dev/sdf /dev/sdg /dev/sdh /dev/sdi
```

