
## df

```bash
# 查看各个磁盘的使用情况
df -h -T
df -TH
```

## du

```bash
# 查看某一个目录下的文件目录磁盘占用情况
sudo du -h -d 1 [path ./home]
sudo du -h --max-depth=1

# 查看当前目录的占用情况
sudo du -sh
```

## tips

### df磁盘空间满了,但du磁盘占用又没满

```bash
# 看下对应进程
sudo lsof -n | grep deleted
# 并重启
ansible all_nodes -b -a 'systemctl restart redis-master'或
ansible all_nodes -b -a 'systemctl restart redis-slave'
```
