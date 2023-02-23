# 用=分割，要第4个字段
ping -c 1 baidu.com | grep 'bytes from' | cut -d = -f 4

echo 'a,a,a' | cut -d , -f 1,2,3
