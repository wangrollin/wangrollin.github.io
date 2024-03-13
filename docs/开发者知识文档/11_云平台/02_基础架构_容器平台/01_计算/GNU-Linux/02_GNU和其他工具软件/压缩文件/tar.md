

## 教程

https://www.runoob.com/linux/linux-comm-tar.html


## 常用命令

### 压缩成 xxx.tar.gz

tar -czvf xxx.tar.gz from_xxx

# 不带目录信息

tar -czvf /opt/sysin/a.tar.gz -C/opt/sysin/ a.log

### 解压

tar -xzvf xxxxxx.tar.gz -C [指定目录]
tar -zxvf xxxxxx.tar.gz xxxxxx


## 对比

tar.gz 保留了信息，比如脚本的执行权限
gz是对整个文件的压缩，所以必须解压缩才能看到文件列表，能利用文件之间的重复来压缩
zip是对单个文件的压缩，所以不用解压缩也能看到文件列表，不能利用文件之间的重复来压缩

