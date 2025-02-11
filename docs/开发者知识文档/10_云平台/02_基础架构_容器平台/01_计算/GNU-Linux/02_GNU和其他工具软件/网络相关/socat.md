
## 介绍

socat（SOcket CAT）是一个功能强大的网络工具，用于在两个网络套接字之间建立连接和数据传输。它提供了类似于标准UNIX cat命令的功能，但可以在网络上操作数据。

socat的主要用途包括：

1. 端口转发：socat可以将数据从一个端口转发到另一个端口，使得两个应用程序可以通过网络进行通信。这对于在不同计算机之间或同一计算机上的不同进程之间建立连接非常有用。

2. 文件传输：socat可以在两个计算机之间传输文件。它可以读取一个文件并将其发送到另一个主机上的文件或套接字，也可以接收来自其他主机的文件并将其写入本地文件系统。

3. 代理和中继：socat可以充当代理服务器或中继，将数据从一个端点传递到另一个端点。这对于在网络上进行调试、监视和分析流量非常有用。

4. 加密和认证：socat支持使用SSL、TLS等协议对数据进行加密和身份验证。这使得socat可以在安全的通信通道上传输敏感数据。

socat是一个非常灵活和可配置的工具，它支持多种协议和选项，可以用于各种网络和系统管理任务。它在Linux、UNIX和类UNIX系统上广泛使用，并且在网络和安全领域具有广泛的应用。

## 安装并配置 socat 的 systemd，保证端口转发一直正常工作

```bash
# 简单命令，把 11122 转发到本机的 22 端口
sudo socat TCP4-LISTEN:11122,fork TCP4:127.0.0.1:22

# systemd 方案
sudo tim install socat -y

sudo vim /etc/systemd/system/socat-forward.service
```

```
[Unit]
Description:Socat Port Forwarding
After=network.target

[Service]
ExecStart=/bin/socat TCP4-LISTEN:11122,fork TCP4:127.0.0.1:22
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl start socat-forward.service
sudo systemctl enable socat-forward.service
sudo systemctl status socat-forward.service

sudo systemctl stop socat-forward.service
sudo systemctl disable socat-forward.service
```

