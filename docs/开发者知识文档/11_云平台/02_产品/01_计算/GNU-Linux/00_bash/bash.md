## Linux里source、sh、bash、./有什么区别

https://www.cnblogs.com/pcat/p/5467188.html


## 查看当前的 shell 是哪个

```bash
echo $0
```

## build-in Commands
cd echo kill
不会有子线程

## External Commands
开子线程执行


## 命令汇总

### 获取上一条命令的 exit code

```bash
echo $?
```

### 输出空行

```bash
echo -e "\n"
```

### 后台运行

- [linux后台执行命令：&和nohup](https://blog.csdn.net/liuyanfeier/article/details/62422742)

```bash
nohup [command] >> xxx.log 2>&1 &
```
