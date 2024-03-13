
list open file

```bash
sudo lsof -p [pid]
sudo lsof -i:[port]
sudo lsof [filename]

lsof abc.txt 显示开启文件abc.txt的进程
lsof -i:22 知道22端口现在运行什么程序
lsof -c nsd 显示nsd进程现在打开的文件
lsof -g gid 显示归属gid的进程情况
lsof +d /usr/local/ 显示目录下被进程开启的文件
lsof +D /usr/local/ 同上,但是会搜索目录下的目录,时间较长
lsof -d 4 显示使用fd为4的进程
lsof -i [i] 用以显示符合条件的进程情况

```