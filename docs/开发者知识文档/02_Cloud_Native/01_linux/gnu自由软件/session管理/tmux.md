
## 网站

- [github官网](https://github.com/tmux/tmux)
- [Tmux 使用教程](https://www.ruanyifeng.com/blog/2019/10/tmux.html)


## 设置

- 鼠标选择：窗格、窗口
- 鼠标调节大小
- 鼠标滚轮滚动
- option键选择文本，cmd c/v 复制粘贴

```bash
vi ~/.tmux.conf

set -g mouse on

tmux source ~/.tmux.conf
```


## 常用命令

```bash
# 退出tmux
Ctrl+d

# 前缀键
Ctrl+b

# 帮助菜单
Ctrl+b ?
q退出




# 新建会话
tmux new -s <session-name>
tmux new -s s1

# 分离会话
Ctrl+b d

# 查看会话和client
tmux ls
tmux list-sessions
tmux list-clients

# 接入会话
tmux attach -t s1
tmux a -t s1
tmux a # 恢复至上一次的会话

# 杀死会话
tmux kill-session -t <session-name>

# 切换会话
tmux switch -t <session-name>

# 重命名会话
tmux rename-session -t 0 <new-name>

# 会话快捷键
Ctrl+b d # 分离当前会话
Ctrl+b s # 列出所有会话
Ctrl+b $ # 重命名当前会话




# 窗格操作

# 划分窗格
tmux split-window # 上下
tmux split-window -h # 左右

# 移动光标
# 光标切换到上方窗格
tmux select-pane -U
# 光标切换到下方窗格
tmux select-pane -D
# 光标切换到左边窗格
tmux select-pane -L
# 光标切换到右边窗格
tmux select-pane -R

# 交换窗格位置
# 当前窗格上移
tmux swap-pane -U
# 当前窗格下移
tmux swap-pane -D

# 窗格快捷键
# 划分左右两个窗格
Ctrl+b %
# 划分上下两个窗格
Ctrl+b "
"
# 光标切换到其他窗格。<arrow key>是指向要切换到的窗格的方向键，比如切换到下方窗格，就按方向键↓。
Ctrl+b <arrow key> 

Ctrl+b ; # 光标切换到上一个窗格。
Ctrl+b o # 光标切换到下一个窗格。
Ctrl+b { # 当前窗格与上一个窗格交换位置。
Ctrl+b } # 当前窗格与下一个窗格交换位置。
Ctrl+b Ctrl+o # 所有窗格向前移动一个位置，第一个窗格变成最后一个窗格。
Ctrl+b Alt+o # 所有窗格向后移动一个位置，最后一个窗格变成第一个窗格。
Ctrl+b x # 关闭当前窗格。
Ctrl+b !# 将当前窗格拆分为一个独立窗口。
Ctrl+b z # 当前窗格全屏显示，再使用一次会变回原来大小。
Ctrl+b Ctrl+<arrow key> # 按箭头方向调整窗格大小。
Ctrl+b q # 显示窗格编号。



# 窗口管理
# 新建窗口
tmux new-window
tmux new-window -n <window-name>
# 切换窗口
# 切换到指定编号的窗口
tmux select-window -t <window-number>
# 切换到指定名称的窗口
tmux select-window -t <window-name>
# 重命名窗口
tmux rename-window <new-name>

# 窗口快捷键
Ctrl+b c # 创建一个新窗口，状态栏会显示多个窗口的信息。
Ctrl+b p # 切换到上一个窗口（按照状态栏上的顺序）。
Ctrl+b n # 切换到下一个窗口。
Ctrl+b <number> # 切换到指定编号的窗口，其中的<number>是状态栏上的窗口编号。
Ctrl+b w # 从列表中选择窗口。
Ctrl+b , # 窗口重命名。

# 其他命令
# 列出所有快捷键，及其对应的 Tmux 命令
tmux list-keys
# 列出所有 Tmux 命令及其参数
tmux list-commands
# 列出当前所有 Tmux 会话的信息
tmux info
# 重新加载当前的 Tmux 配置
tmux source-file ~/.tmux.conf
```

