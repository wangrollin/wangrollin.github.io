
- [doc: ssh_config — OpenSSH client configuration file](http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/ssh_config.5?query=ssh_config&sec=5)

## 指定 private key 登录

```bash
ssh -i ~/Deploy.key UserName@HostIP
```

## 配置 ssh 默认 private key

默认使用 id_rsa

```
Host *
    IdentityFile ~/.ssh/id_rsa
```

上述配置将 `~/.ssh/id_rsa` 设置为默认的身份验证私钥文件。如果您的私钥文件名不是 `id_rsa`，请相应地修改 `IdentityFile` 的路径。

## 配置 ssh config

```bash
# 生成 client 机器的密钥对
ssh-keygen

# 把公钥复制到 server 上
ssh-copy-id -i ~/.ssh/id_rsa.pub root@[server ip]

# 使用私钥配置 ssh config
cd ~/.ssh
vim ~/.ssh/config

Host betterdev
  HostName better.dev
  User nick

Host example2
  HostName example.com
  User root

Host example3
  HostName 64.233.160.0
  User userxyz123
  Port 56000

Host devbox
    HostName 1.1.1.1
    User root
    Port 22
    IdentityFile /Users/admin/.ssh/id_rsa

Host amazon1
  HostName ec2.amazon.com
  User ec2-user
  IdentityFile /path/to/special/privatekey/amazon.pem

ssh betterdev
```

## 执行命令

ssh root@1.1.1.1 "echo 111"

ssh test1 "ls /"


## tips

### xxx.pem 处理

chmod 400 xxx.pem

### 通过 ssh-key 登录

```bash
复制 id_rsa.pub 到 /root/.ssh/authorized_keys
```

ssh -i id_rsa  root@xxxxx 
