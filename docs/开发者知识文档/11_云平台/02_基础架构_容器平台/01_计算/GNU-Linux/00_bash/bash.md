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

### 查看版本

echo "${BASH_VERSION}"

### 后台运行

- [linux后台执行命令：&和nohup](https://blog.csdn.net/liuyanfeier/article/details/62422742)

```bash
nohup [command] >> xxx.log 2>&1 &
```

### 通道重定向

https://blog.csdn.net/u011630575/article/details/52151995
https://cloud.tencent.com/developer/article/1139965

一般来说, "1>" 通常可以省略成 ">".
/dev/null是一个文件，这个文件比较特殊，所有传给它的东西它都丢弃掉

```bash
1>/dev/null
>/dev/null

2>/dev/null

1>&2
>&2

2>&1
```

### 让命令返回 exit 0

helm delete xxxx || true

### if else 一行写法

test -e 文件路径 && echo "文件存在" || echo "文件不存在"

### 变量1的值作为变量2的key

```
user_w=${module}_MYSQL_USER_W
echo "${!user_w}"
```

### 把路径中的 /a/b/c/d/../.. 自动转换成 /a/b

```bash
path="/a/b/c/d/../.."
canonical_path=$(readlink -f "$path")
echo "$canonical_path"

path="/a/b/c/d/../.."
canonical_path=$(realpath "$path")
echo "$canonical_path"
```


## 脚本常用开头

```bash
#!/bin/bash

set -euo pipefail

cd "$(dirname ${BASH_SOURCE[0]})"
SHELL_FOLDER=$(pwd)
```

## 正则匹配

```bash
s="123"
regex="[[:digit:]]"
regex="[0-9]"

if [[ $s =~ $regex ]]; then
  echo "$s matches $regex"
else
  echo "$s doesn't match $regex"
fi
```