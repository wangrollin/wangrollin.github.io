

## 官网

https://letsencrypt.org/zh-cn/getting-started/

## 安装 certbot，生成证书，阿里云 DNS 自动续期

```bash
# 1. 安装插件
sudo pip install --target=/usr/lib/python3.12/site-packages certbot-dns-aliyun

# 2. 获取阿里云 AccessKey
# 去阿里云 AccessKey 管理创建一个，建议用 RAM 子账号，只授予 AliyunDNSFullAccess 权限。

# 3. 创建凭证文件
sudo mkdir -p /etc/letsencrypt
sudo tee /etc/letsencrypt/aliyun.ini > /dev/null << EOF
dns_aliyun_access_key = ak
dns_aliyun_access_key_secret = sk
EOF
sudo chmod 600 /etc/letsencrypt/aliyun.ini

# 4. 申请证书
sudo certbot certonly \
--authenticator dns-aliyun \
--dns-aliyun-credentials /etc/letsencrypt/aliyun.ini \
-d "*.example.com" -d example.com

# 5. 确认自动续期
# 检查 timer
sudo systemctl enable --now certbot-renew.timer
sudo systemctl status certbot-renew.timer

# 测试续期
sudo certbot renew --dry-run

# 续期时 certbot 会自动通过阿里云 API 添加/删除 TXT 记录，全程无需手动操作。
```

## 常用命令

certbot certificates
certbot plugins

## ACME 客户端

[Certbot ACME 客户端](https://certbot.eff.org/)

```bash
sudo snap install --classic certbot

sudo certbot --nginx
sudo certbot certonly --standalone

   /etc/letsencrypt/live/wangrollin.com/fullchain.pem
   /etc/letsencrypt/live/wangrollin.com/privkey.pem
```

## Q&A

### 既然Let's Encrypt全球都能免费用，为啥大家还需要买付费证书呢？

⏺ 好问题。Let's Encrypt 能覆盖大多数场景，但付费证书在以下方面有差异：

  1. 验证等级不同

  ┌────────────────┬────────────────────────┬───────────────┬─────────┐
  │      类型      │        验证内容        │ Let's Encrypt │ 付费 CA │
  ├────────────────┼────────────────────────┼───────────────┼─────────┤
  │ DV（域名验证） │ 你拥有这个域名         │ 支持          │ 支持    │
  ├────────────────┼────────────────────────┼───────────────┼─────────┤
  │ OV（组织验证） │ 域名 + 公司真实存在    │ 不支持        │ 支持    │
  ├────────────────┼────────────────────────┼───────────────┼─────────┤
  │ EV（扩展验证） │ 域名 + 公司 + 法律审查 │ 不支持        │ 支持    │
  └────────────────┴────────────────────────┴───────────────┴─────────┘

  OV/EV 证书点开浏览器锁可以看到公司名称，Let's Encrypt 只做 DV。金融、政府、大企业往往需要
  OV/EV 来证明"这个网站确实属于某公司"。

  2. 付费证书的实际价值

  - 商业担保：付费 CA 提供赔偿（如证书误签导致损失，赔 $10k~$1.75M），Let's Encrypt 无赔偿
  - 通配符管理更方便：Let's Encrypt 支持通配符但必须 DNS 验证且 90 天续期，付费证书可以 1-2
  年有效期，运维更省心
  - 合规要求：某些行业审计（PCI-DSS、金融监管）明确要求 OV/EV 证书
  - 技术支持：出了问题有人帮你排查，Let's Encrypt 只有社区论坛
  - SAN 多域名证书：付费证书在管理大量子域名时更灵活

  3. 为什么多数人不需要买

  - 个人站点、中小企业、API 服务 → DV 完全够用
  - 现代浏览器已经不再对 EV 证书显示绿色地址栏（Chrome 2019 年移除了），视觉差异几乎没了
  - 自动续期反而比长期证书更安全（密钥暴露窗口更短）

  总结

  90%+ 的网站 → Let's Encrypt 足够
  需要 OV/EV、合规审计、商业担保、长有效期 → 买付费证书

  Let's Encrypt 改变了行业——HTTPS 从"花钱才能用"变成了基础设施。付费证书现在更多是为了组织身
  份证明和商业保障，而不是加密本身。


