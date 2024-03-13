

## 命令

### 手动挂载/卸载

sudo mount /dev/vdb1 /data00

umount /dev/vdb1

### 系统启动自动mount

```bash
vim /etc/fstab

/dev/vdb1 /data00 ext4 defaults 0 2

# 查看 uuid
lfblk -f

# 创建 mount point
mkdir /data00

# /dev/sda4
UUID=84a4bd7b-bf11-455e-a25c-32c359512bb3 /data00 ext4 defaults 0 2

# 执行以下步骤，验证自动挂载功能
# 执行如下命令，将“/etc/fstab”文件所有内容重新加载。
mount -a

# 执行如下命令，查询文件系统挂载信息。
mount | grep /data00

# 回显类似如下信息，说明自动挂载功能生效：
# /dev/vdb1 on /data00 type ext4 (rw,relatime,data=ordered)

```