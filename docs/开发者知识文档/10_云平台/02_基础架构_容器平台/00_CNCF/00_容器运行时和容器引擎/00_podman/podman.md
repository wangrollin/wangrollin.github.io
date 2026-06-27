
## 备忘录

由 red hat 开发，

- [redhat podman 官方文档](https://www.redhat.com/zh/topics/containers/what-is-podmanr)


Podman Desktop，适合本地开发
https://www.redhat.com/zh/topics/containers/what-is-podman-desktop

https://podman.io/

https://github.com/containers/podman


podman 项目对标的是docker命令的代替，官方说明是A tool for managing OCI containers and pods
 buildah项目实现的是dockerfile的脚本化执行，官方说明是A tool that facilitates building OCI images
skopeo 项目负责处理镜像相关的工作，比如检查、复制、签名，官方说明是Work with remote images registries - retrieving information, images, signing content


在Centos 8中，已经不适用docker作为默认的容器化工具，替代品也就是使用podman、buildah、skopeo。

## 常用网站

- [官网](https://podman.io/)

## 安装

```bash
# mac
下载 podman desktop

# rocky
sudo dnf install -y podman

# podman desktop
docker compliance - enable

# 命令兼容 docker
echo "alias docker=podman" >> ~/.zshrc

```

## 配置镜像加速器（Registry Mirror）

2026/04/12 亲测有效

```bash
# 编辑 Podman 的 registries 配置：

# macOS 上通常在 podman machine 里
podman machine ssh

# 编辑配置
sudo vi /etc/containers/registries.conf

# 添加镜像源：
[[registry]]
prefix = "docker.io"
location = "docker.io"

[[registry.mirror]]
location = "docker.m.daocloud.io"

# 修改后重启
podman machine stop && podman machine start
```

## 可用源 2026-04-12

维护在github：https://github.com/dongyubin/DockerHub

```
https://docker.m.daocloud.io
https://mirror.gcr.io
https://docker.1ms.run

https://proxy.vvvv.ee
https://dockerproxy.net
https://dockerproxy.link
```

## 搭配systemd做自动重启

此时不要加 --restart=always，两者会冲突：容器崩溃时 systemd 想重启，Podman 也想重启，可能互相打架导致异常

```bash
# 生成 systemd 服务
podman generate systemd --name ${container-name} --files --new

# systemd root 模式
mv container-${container-name}.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now container-${container-name}.service
```

**systemctl enable --now container-${container-name}.service**

⏺ --now 是把两步合成了一步：

```bash
  # 等价于分开执行这两条
  systemctl enable container-postgres.service   # 设置开机自启
  systemctl start container-postgres.service    # 立即启动

  - enable → 开机自动启动
  - --now → 同时立刻启动，不用再单独 start
```

**container-{容器名}.service**

⏺ 是自动生成的，规则是：

  container-{容器名}.service

  所以 --name postgres → container-postgres.service

  如果容器名是 data-infra-postgres，生成的就是 container-data-infra-postgres.service

## 常见问题

### 会被防火墙拦截吗？ firewalld

❯ 我是用podman在rockylinux中跑的PG，这样会绕过firewalld吗？

⏺ 取决于你怎么跑的：

```bash
  rootful Podman（sudo podman run -p 5432:5432）— 会绕过。新版 Podman 用 netavark/aardvark-dns 做网络，也会直接写 nftables/iptables 规则做端口转发，和 Docker 类似。

  rootless Podman（普通用户运行）— 一般不会绕过，因为用的是 slirp4netns 或 pasta，机制不同。

  你可以验证：

  sudo nft list ruleset | grep 5432
  # 或
  sudo iptables -t nat -L -n | grep 5432

  如果看到相关转发规则，就是 Podman 网络栈加的，firewalld 管不到。
```

### --restart=always 和docker行为一致吗？

⏺ --restart=always 在 Podman 中语法上支持，但行为和 Docker 不同：

  - Podman 没有常驻守护进程，所以重启后不会自动拉起容器
  - 它只在 Podman 进程运行期间生效（比如容器崩溃时会自动重启）

想要崩溃自动重启 → --restart=always 够用；想要开机自启 → 必须配 systemd

### podman root 和 非root，看到的容器是不相同的，是为啥？

⏺ Podman 的 rootful 和 rootless 模式使用完全独立的存储和命名空间，所以看到的容器不同。

```bash

  核心原因：

  1. 存储路径不同
    - root: /var/lib/containers/storage/
    - 非root: ~/.local/share/containers/storage/
  2. 运行时状态隔离
    - root: /run/containers/
    - 非root: /run/user/<UID>/containers/（通过 XDG_RUNTIME_DIR）
  3. 用户命名空间（User Namespace）隔离
    - rootless Podman 运行在独立的 user namespace 中，利用 /etc/subuid 和 /etc/subgid 映射 UID/GID
    - 两者的网络栈也不同：root 用 CNI/netavark 直接操作，rootless 用 slirp4netns 或 pasta

  简单说，它们就是两套完全独立的 Podman 实例，共享的只是同一个 Podman 二进制文件。

  要查看 root 容器必须 sudo podman ps，普通用户只能看到自己的。

```

### root用户能查看到所有用户的吗？

⏺ 不能。 sudo podman ps 也只能看到 root 自己的容器。

```bash
  要查看某个非 root 用户的容器，需要切换到该用户的上下文：

  # 方法1：用 su 切换
  sudo su - <username> -c "podman ps -a"

  # 方法2：用 machinectl（systemd 环境）
  sudo machinectl shell <username>@ /usr/bin/podman ps -a

  原因是 Podman 没有中心化的 daemon（不像 Docker），每个用户独立管理自己的存储和运行时状态，root 也只是"又一个用户"而已。
```