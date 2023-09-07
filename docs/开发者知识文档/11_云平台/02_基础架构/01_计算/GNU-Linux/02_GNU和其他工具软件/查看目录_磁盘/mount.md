
sudo mount /dev/vdb1 /data00


### 系统启动自动mount

vim /etc/fstab

/dev/vdb1 /data00 ext4 defaults 0 2
