# docker

Docker 使用过程中有许多常用的命令，完整列表可以查看docker help


## 核心概念

### docker cli

~/.docker/config.json

### docker daemon

/etc/docker/daemon.json


## 镜像搬运工

skopeo

## 多平台兼容 arm64 amd64

- [Multi-arch build and images, the simple way](https://www.docker.com/blog/multi-arch-build-and-images-the-simple-way/)

#### docker manifest

```bash
# AMD64
docker build -t your-username/multiarch-example:manifest-amd64 --build-arg ARCH=amd64/ .
docker push your-username/multiarch-example:manifest-amd64

# ARM32V7
docker build -t your-username/multiarch-example:manifest-arm32v7 --build-arg ARCH=arm32v7/ .
docker push your-username/multiarch-example:manifest-arm32v7

# ARM64V8
docker build -t your-username/multiarch-example:manifest-arm64v8 --build-arg ARCH=arm64v8/ .
docker push your-username/multiarch-example:manifest-arm64v8

docker manifest create \
your-username/multiarch-example:manifest-latest \
--amend your-username/multiarch-example:manifest-amd64 \
--amend your-username/multiarch-example:manifest-arm32v7 \
--amend your-username/multiarch-example:manifest-arm64v8

docker manifest push your-username/multiarch-example:manifest-latest


# 构建多架构镜像 tar 的方法
docker buildx build --platform linux/amd64 --push -t localhost:5000/myimage:amd64 .
docker buildx build --platform linux/arm64 --push -t localhost:5000/myimage:arm64 .
docker manifest create myimage:latest --amend myimage:amd64 --amend myimage:arm64
docker manifest push localhost:5000/myimage:latest
docker image save -o myimage.tar localhost:5000/myimage:latest
```

#### docker buildx

```bash
docker buildx build \
--push \
--platform linux/arm/v7,linux/arm64/v8,linux/amd64 \
--tag your-username/multiarch-example:buildx-latest .
```


## 阿里云docker镜像服务

```bash
docker build -t registry.cn-hangzhou.aliyuncs.com/wangrollin-web/web-front:0.0.3 .

sudo docker login --username=username registry.cn-hangzhou.aliyuncs.com

docker push registry.cn-hangzhou.aliyuncs.com/wangrollin-web/web-front:0.0.3

docker run -d -p 80:80 registry.cn-hangzhou.aliyuncs.com/wangrollin-web/web-front:0.0.3
```

## dockerfile

- [菜鸟教程 dockerfile](https://www.runoob.com/docker/docker-dockerfile.html)


### .dockerignore

## 镜像网络

docker network create <network_name>
docker run --network=<network_name> <container_image>
docker network ls
docker network inspect <network_name>

### Docker自带的网络类型主要有以下几种：

1. Bridge网络（桥接网络）：
   Bridge网络是Docker默认创建的网络类型。它使用Docker宿主机上的网桥设备（通常为docker0）来连接容器和宿主机之间的通信。每个容器都会分配一个IP地址，并可以通过宿主机的IP地址进行访问。

2. Host网络（主机网络）：
   Host网络类型将容器直接放置在宿主机的网络栈中，与宿主机共享网络命名空间。容器将使用宿主机的IP地址和端口，可以直接访问宿主机上的网络资源，但容器之间的端口会发生冲突。

3. None网络（无网络）：
   None网络类型是一个隔离网络环境，容器在该网络中没有网络接口。这意味着容器无法直接通过网络访问外部资源，也无法从外部访问容器。但容器仍然可以使用本地的网络和IPC（进程间通信）机制。

4. Overlay网络（覆盖网络）：
   Overlay网络类型用于创建跨多个Docker宿主机的容器网络。它允许容器在不同的宿主机上进行通信，形成一个虚拟的网络层。Overlay网络使用VXLAN（Virtual Extensible LAN）技术将容器数据包封装在底层网络中。

5. Macvlan网络：
   Macvlan网络类型允许将容器直接连接到物理网络，每个容器会分配一个独立的MAC地址。这使得容器能够像物理机器一样直接与网络通信。每个容器都可以具有自己的IP地址。

这些是Docker自带的常用网络类型。除了这些，还可以通过自定义网络插件扩展Docker的网络功能，以满足特定的需求。

### 以下是创建不同类型网络的具体Docker命令示例：

1. 创建桥接网络（Bridge）：
```
docker network create my-bridge-network
```

   这将创建一个名为`my-bridge-network`的桥接网络。

2. 创建主机网络（Host）：
```
docker network create --driver=host my-host-network
```

   这将创建一个名为`my-host-network`的主机网络。

3. 创建无网络（None）：
```
docker network create --driver=null my-none-network
```

   这将创建一个名为`my-none-network`的无网络。

4. 创建覆盖网络（Overlay）：
```
docker network create --driver=overlay my-overlay-network
```

   这将创建一个名为`my-overlay-network`的覆盖网络。

5. 创建Macvlan网络：
```
docker network create --driver=macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=eth0 my-macvlan-network
```

   这将创建一个名为`my-macvlan-network`的Macvlan网络，指定了子网、网关和宿主机的物理网络接口（`eth0`）。

请注意，上述命令中的网络名称（例如`my-bridge-network`）仅为示例，你可以根据需要自行替换。另外，某些网络类型可能需要指定其他参数，以符合你的网络配置。

你可以使用`docker network ls`命令来列出所有的网络，并使用`docker network inspect <network_name>`命令查看特定网络的详细信息。

希望这些命令示例能够帮助你创建不同类型的Docker网络。

## 常用镜像

### busybox, 精简的GNU工具集

### alpine, 精简的linux

### ubuntu, linux

## 常用命令

### 启动 docker daemon

systemctl start docker
systemctl enable docker

systemctl status docker

### 查看版本

docker version

### 登录操作

docker login hub.example.com -u 用户名 -p 密码
docker login 
username
pwd

cat ~/.docker/config.json
{
	"auths": {
		"hub.example.com": {
			"auth": "yOmZKaVA4eE9RSkRuNA=="
		}
	}
}

### 镜像操作

```bash
docker build -t runoob/ubuntu:v1 . 
docker build -t config.example.com/wechat-analytics-flink:0.0.1-SNAPSHOT .

docker run config.example.com/wechat-analytics-flink:0.0.1-SNAPSHOT
docker run -d xxx # 后台执行
docker run -w xxx # 指定工作目录
docker run -it xxx /bin/sh # 容器不会退出
docker run -it --entrypoint bash xxx
docker run --user $(id -u user1):$(id -g user1) -it xxx bash

docker run --add-host 可以添加 etc hosts，举例子
docker run -d -it \
    --add-host my-pc.example.local:10.32.223.86 \
    --add-host my-pc:10.32.223.86 \

docker images # 查看镜像
docker image inspect xxx
docker image tag ubuntu localhost:5000/myfirstimage

docker rmi <镜像ID或名称> # 删除镜像

docker search <关键词> # 在镜像仓库中搜索

docker pull <镜像> # 从镜像仓库拉取镜像
docker pull <镜像> --platform linux/arm64/v8
docker pull <镜像> --platform linux/amd64

docker save -o image.tar <镜像ID或名称> # 将镜像保存到文件
docker load -i image.tar # 从文件载入镜像

docker save name:version | gzip > name_version.tar.gz
docker load -i image.tar.gz # 从文件载入镜像
gunzip -c name_version.tar.gz | docker load
```

### 容器操作

```bash
docker ps # 查看运行的容器
docker ps -a # 查看所有的容器


docker restart <容器ID或名称> # 重启容器

docker stop <容器ID或名称> # 停止容器

docker start <容器ID或名称> # 启动停止的容器

docker rm <容器ID或名称> # 删除容器，必须先停止，使用 -f 参数强制删除

docker logs <容器ID或名称> # 查看容器的日志

docker exec <容器ID或名称> <命令> # 在容器中执行命令
docker exec -ti <容器ID或名称> bash # 典型的用法是登陆容器的 bash
docker exec -it -w /root container_name /bin/bash

docker top <容器ID或名称> # 查看容器的进程

docker inspect <容器ID或名称> # 查看容器的底层信息，如 IP 等

docker run -d -it adoptopenjdk/openjdk11:latest /bin/bash

# --rm 运行后就退出，适合执行一次
docker run -it --rm adoptopenjdk/openjdk11:latest bash -c 'echo can run like a charm'

docker run -it --rm -d \
  -p 80:80 \
  -v /xx:/xx \
  --name my-container \
  eclipse-temurin:8 bash -c "echo 111 && sleep 10 && echo 1111"

# 查看具体信息的列
docker ps --format "{{.Image}}\t{{.Status}}"
```

### 容器和镜像的磁盘空间

```bash
# docker镜像和容器空间占用
docker system df -v | grep GB

# 清理节点镜像缓存，尝试释放空间
docker system prune -f

docker container prune # 删除所有停止的容器
docker image prune -a # 删除没有容器使用的镜像
docker image rm myimage:tag
```

## daemon.json / config.json

/etc/docker/daemon.json
~/.docker/config.json

### enable experimental

daemon.json
{
  "experimental": true
}
sudo systemctl restart docker


config.json
{
  "experimental": "enabled"
}


## docker 里运行 docker
```bash

docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  my_image \
  bash

-v /var/run/docker.sock:/var/run/docker.sock
-v /usr/bin/docker:/usr/bin/docker

chmod 777 /var/run/docker.sock
```
## ubuntu如何安装docker

https://docs.docker.com/install/linux/docker-ce/ubuntu/

https://blog.csdn.net/qq_27818541/article/details/73647797



## 配置docker阿里云的镜像加速器

> 针对安装了Docker for Mac的用户，您可以参考以下配置步骤：

右键点击桌面顶栏的 docker 图标，选择 Preferences ，在 Daemon 标签（Docker 17.03 之前版本为 Advanced 标签）下的 Registry mirrors 列表中将

https://vxcv99nl.mirror.aliyuncs.com加到"registry-mirrors"的数组里，点击 Apply & Restart按钮，等待Docker重启并应用配置的镜像加速器。


> ubuntu server

/etc/docker/daemon.json
{
  "registry-mirrors": ["https://vxcv99nl.mirror.aliyuncs.com"]
}

sudo systemctl daemon-reload
sudo systemctl restart docker
docker info


清华源 https://docker.mirrors.tuna.tsinghua.edu.cn

目前最快: https://docker.m.daocloud.io/

更新: /etc/docker/daemon.json

{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.nju.edu.cn",
        "https://dockerproxy.com"
    ]
}

重启 docker 后通过docker info检查源是否替换成功

 Registry Mirrors:
  https://docker.m.daocloud.io/
  https://docker.nju.edu.cn/
  https://dockerproxy.com/

2024-12-18 能用的 docker 源

    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.unsee.tech",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "http://mirror.azure.cn",
    "https://dockerpull.org",
    "https://dockerhub.icu",
    "https://hub.rat.dev"

## docker login fail ubuntu18.04： error saving credentials: error storing credentials - err: exit status 1, out: Cannot autolaunch D-Bus without X11 $DISPLA

sudo apt install gnupg2 pass


## 把运行中的容器保存为新镜像

```bash
docker commit jenkins registry.cn-hangzhou.aliyuncs.com/sherry/jenkins:2.153-1
docker commit 当前运行的容器名 新镜像名:版本号
```


## problem

> docker-credential-desktop not installed or not available in PATH

sed -i~ 's/"desktop"/"osxkeychain"/g' ~/.docker/config.json

https://github.com/docker/for-mac/issues/3785
