

## ~ (/home/用户名)
用户主目录，最常用

## /tmp
临时文件，重启可能清空

## /var/tmp
临时文件，重启不清空

## /run/user/$(id -u)
用户运行时目录，注销即清空

## /var
variable
运行中会变化的数据：日志(/var/log)、数据库文件(/var/lib)、邮件、缓存(/var/cache)
程序运行产生的数据

### /var/lib
状态数据，删了程序就坏了。是通过包管理器安装的程序存数据的标准位置

### /var/log
日志，删了不影响运行

### /var/cache
缓存，删了可以重新生成

## /opt
optional
第三方/可选软件的安装目录，通常一个软件一个子目录，如 /opt/google/chrome
手动装的第三方软件

## /usr
Unix System Resources
系统级的程序和库：/usr/bin(命令)、/usr/lib(库)、/usr/share(共享资源)
系统装的软件（包管理器管理的）

### /usr/local/bin/
用户自己安装的程序（通过Homebrew、手动编译等）。专门留给用户/第三方软件使用

