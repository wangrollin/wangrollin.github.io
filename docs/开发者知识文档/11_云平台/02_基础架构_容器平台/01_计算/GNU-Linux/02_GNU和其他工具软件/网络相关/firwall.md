
在 Linux 系统中，使用 firewall-cmd 工具（常见于基于 CentOS、RHEL 等使用 firewalld 防火墙服务的系统）可以将 IP 地址添加到防火墙白名单（在 firewalld 中对应的是信任区域的概念），以下是具体的操作步骤：

1. 查看防火墙状态
2. 
首先，要确保 firewalld 防火墙服务处于运行状态，可以使用以下命令来查看：

```bash
systemctl status firewalld
```

如果防火墙没有运行，使用以下命令启动它：

```bash
systemctl start firewalld
```

1. 查看现有区域信息（可选）

可以通过以下命令查看当前系统中定义的 firewalld 区域以及各个区域所关联的网络接口等信息：

```bash
firewall-cmd --list-all
```

或者查看指定区域（比如默认的 public 区域）的详细信息：

```bash
firewall-cmd --zone=public --list-all
```

这一步是为了了解当前防火墙配置情况，方便后续操作，属于可选步骤。

1. 添加 IP 到信任区域（白名单）

firewalld 中有一个默认的信任区域叫 trusted，添加 IP 到该区域（也就是将 IP 加入白名单），可以使用以下命令格式：

```bash
firewall-cmd --permanent --zone=trusted --add-source=<IP地址>
```

例如，要将 IP 地址 192.168.1.100 添加到白名单，命令就是：

```bash
firewall-cmd --permanent --zone=trusted --add-source=192.168.1.100
```

其中 --permanent 参数表示永久生效配置（需要重新加载防火墙配置后才会真正生效），如果只是想临时添加（重启防火墙后配置就失效），可以省略这个参数，但通常建议使用 --permanent 来做持久化配置。

1. 重新加载防火墙配置

添加 IP 地址到白名单的配置完成后，需要重新加载 firewalld 的配置，使新的设置生效，使用以下命令：

```bash
firewall-cmd --reload
```

通过以上步骤，就可以成功地将指定的 IP 地址添加到 firewalld 防火墙的白名单（trusted 区域）中了。
