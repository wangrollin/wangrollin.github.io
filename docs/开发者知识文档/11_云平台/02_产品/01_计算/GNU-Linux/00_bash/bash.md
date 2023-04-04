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

### $xxx 相关

```bash
$$
# Shell本身的PID（ProcessID）

$!
# Shell最后运行的后台Process的PID

$?
echo $?
# 最后运行的命令的结束代码（返回值）

$-
# 使用Set命令设定的Flag一览

$*
# 所有参数列表。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。

$@
# 所有参数列表。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。

$#
# 添加到Shell的参数个数

$0
# Shell本身的文件名

$1～$n
# 添加到Shell的各参数值。$1是第1参数、$2是第2参数…。
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
