
## 网站

- [官网](https://www.nginx.com/)
- [doc](https://nginx.org/en/)


## 配置端口转发

```bash
sudo apt install nginx

# 检查配置文件
nginx -t

server {
  server_name wangrollin.com;
  listen 443;
 
  location / {
    proxy_pass http://127.0.0.1:8080;
  }
}

server {
  server_name default_server;
  listen 443;
 
  location / {
    proxy_pass http://127.0.0.1:8080;
  }
}




# 查看Nginx的版本号
nginx -V

# 启动Nginx
start nginx

# 快速停止或关闭Nginx
nginx -s stop

# 正常停止或关闭Nginx
nginx -s quit

# 配置文件修改重装载命令
nginx -s reload
```
