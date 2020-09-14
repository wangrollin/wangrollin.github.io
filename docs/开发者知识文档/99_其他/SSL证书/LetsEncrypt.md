

## 官网

https://letsencrypt.org/zh-cn/getting-started/


## ACME 客户端

[Certbot ACME 客户端](https://certbot.eff.org/)

```bash
sudo snap install --classic certbot

sudo certbot --nginx
sudo certbot certonly --standalone

   /etc/letsencrypt/live/wangrollin.com/fullchain.pem
   /etc/letsencrypt/live/wangrollin.com/privkey.pem
```