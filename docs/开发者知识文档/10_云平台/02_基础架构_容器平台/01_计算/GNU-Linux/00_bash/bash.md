
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

### if else

if [ $a -eq 1 ]; then
    echo "hello"
else
    echo "world"
fi


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
nohup [command] >> /dev/null 2>&1 &
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

### 让命令返回 exit 0，可以有效避免因 exit 非0，导致整个脚本中断的情况

helm delete xxxx || true

### 避免因 exit 非0，导致整个脚本中断的情况

在 set -euo pipefail 开启的情况下，只要管道命令中任何一个子命令返回非零退出状态或者出现变量未设置等情况就会导致脚本退出。对于你提到的 process_cnt=$(ps aux | grep java | grep ${module} | wc -l) 这条命令返回值为 0 导致脚本退出的问题，可以通过以下几种方式来解决，避免脚本意外提前退出：

**方法一：使用逻辑或（||）结合命令替换**
利用逻辑或操作符的特性，将可能导致退出的命令放在逻辑或左边，然后在右边放置一个总是返回成功（退出状态为 0）的命令，例如：
```bash
process_cnt=$(ps aux | grep java | grep ${module} | wc -l) || true
```
这样，即便前面的管道命令整体返回非零状态（比如在你的例子中返回 0 触发了 set -e 的退出机制），后面的 true 命令会被执行，其返回值为 0，从而阻止了整个脚本因为这条语句而意外退出。

**方法二：使用 if 语句包裹**
将命令放在 if 语句中执行，通过 if 语句来控制流程，避免直接因为命令返回值影响整个脚本的执行。示例如下：

```bash
if process_cnt=$(ps aux | grep java | grep ${module} | wc -l); then
    # 这里可以添加当获取到process_cnt值成功后的逻辑处理
    echo "process_cnt is $process_cnt"
else
    # 这里可以添加获取process_cnt值失败后的处理逻辑，比如设置一个默认值等
    process_cnt=0
    echo "Failed to get process_cnt, set it to 0"
fi
# 后续脚本继续执行的其他逻辑可以放在这里
```

通过这种方式，无论 process_cnt=$(ps aux | grep java | grep ${module} | wc -l) 这条命令执行情况如何，脚本都能继续按期望的流程往下走，而不是直接退出。

**方法三：临时关闭 set -e**
在执行这条可能导致问题的命令之前，暂时关闭 set -e 选项，执行完后再恢复它，示例代码如下：

```bash
# 保存当前的set -e状态
set +e
process_cnt=$(ps aux | grep java | grep ${module} | wc -l)
# 恢复set -e状态
set -e
# 后续可以根据process_cnt的值进行相应处理
echo "process_cnt is $process_cnt"
```
不过要注意这种方式需要谨慎使用，确保在关闭 set -e 期间执行的命令不会出现意外情况而导致不符合预期的脚本行为，并且要记得及时恢复原设置状态。

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

## 文件是否存在

```bash
#!/bin/bash

file="/opt/file"

if [ -e "$file" ]; then
    echo "文件存在"
else
    echo "文件不存在"
fi
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
