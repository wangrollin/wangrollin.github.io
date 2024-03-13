
echo $UID

cat /etc/passwd

grep -E "^username:" /etc/passwd | cut -d : -f 3
useradd -G 1003

useradd -u 1003 -g 1003 -s /bin/bash group-name

group-name:x:1003:1003::/home/group-name:/bin/bash