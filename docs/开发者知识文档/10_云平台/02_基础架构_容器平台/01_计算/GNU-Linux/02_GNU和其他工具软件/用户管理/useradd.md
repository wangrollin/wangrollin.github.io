
echo $UID

cat /etc/passwd

grep -E "^username:" /etc/passwd | cut -d : -f 3
useradd -G 1003

useradd -u 1003 -g 1003 -s /bin/bash group-name

group-name:x:1003:1003::/home/group-name:/bin/bash

sudo useradd [username]
sudo passwd [username]

自动创建主目录
sudo useradd -m [username]

加到sudo组中
sudo usermod -aG sudo [username]


# 创建一个有 sudo 权限的用户

useradd -m user1
passwd passwd1
passwd1
visudo
user1       ALL=(ALL)       NOPASSWD: ALL

