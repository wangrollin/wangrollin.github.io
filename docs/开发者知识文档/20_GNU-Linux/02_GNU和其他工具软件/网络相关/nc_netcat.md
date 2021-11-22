
netcat被誉为网络安全界的'瑞士军刀'


## 网页

- [用nc命令搭建http请求调试工具](https://blog.csdn.net/diabatic/article/details/46867447)

```bash

while true; do nc -l 8888; done

【linux】
nc -l -p 9999
while true; do nc -l -p 9999; done
while true ; do (echo -e "HTTP/1.1 200 OK\n\n $(date)") |  nc -l -p 1500 ; done
```

