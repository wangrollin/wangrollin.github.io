
```bash
ssh-keygen
```

- [doc: ssh_config — OpenSSH client configuration file](http://man.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/ssh_config.5?query=ssh_config&sec=5)


```bash
cd ~/.ssh
vim config

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

Host amazon1
  HostName ec2.amazon.com
  User ec2-user
  IdentityFile /path/to/special/privatekey/amazon.pem

ssh betterdev
```

## tips

### 通过 ssh-key 登录

```bash
复制 id_rsa.pub 到 /root/.ssh/authorized_keys
```
