
- [菜鸟 Linux crontab 命令](https://www.runoob.com/linux/linux-comm-crontab.html)


查看指定用户的时程表
crontab -u root -l

查看当前用户的 crontab 文件
crontab -l

编辑当前用户的 crontab 文件：
crontab -e

删除当前用户的 crontab 文件：
crontab -r

列出某个用户的 crontab 文件（需要有相应的权限）：
crontab -u username -l

编辑某个用户的 crontab 文件（需要有相应的权限）：
crontab -u username -e

