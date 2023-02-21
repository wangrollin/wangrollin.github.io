
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
  listen 444;
 
  location / {
    proxy_pass www.baidu.com;
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
nginx -t
nginx -s reload



netstat -anp | grep 443
netstat -anp | grep nginx
curl https://wangrollin.com

sudo systemctl start nginx 
sudo systemctl stop nginx 
sudo systemctl status nginx
sudo systemctl restart nginx

```

## proxy

转发配置 proxy_redirect 可以修改 response header location，这样 302 请求的才能正常，而不是返回内部域名

## location 匹配顺序

= (exactly)
location = /path

^~ (forward match)
location ^~ /path

~ (regular expression case sensitive)
location ~ /path/

~* (regular expression case insensitive)
location ~* .(jpg|png|bmp)

/
location /path