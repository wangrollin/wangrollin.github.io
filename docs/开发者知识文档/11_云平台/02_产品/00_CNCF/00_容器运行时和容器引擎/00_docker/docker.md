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

## 常用命令

### 启动 docker daemon

systemctl start docker

### 查看版本

docker version

### 登录操作

docker login hub.example.com
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

docker images # 查看镜像
docker image inspect xxx

docker rmi <镜像ID或名称> # 删除镜像

docker search <关键词> # 在镜像仓库中搜索

docker pull <镜像> # 从镜像仓库拉取镜像
docker pull <镜像> --platform linux/arm64/v8
docker pull <镜像> --platform linux/amd64

docker save -o image.tar <镜像ID或名称> # 将镜像保存到文件
docker load -i image.tar # 从文件载入镜像

docker save name:version | gzip > name_version.tar.gz
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
```

### 容器和镜像的磁盘空间

```bash
# docker镜像和容器空间占用
docker system df -v | grep GB

# 清理节点镜像缓存，尝试释放空间
docker system prune -f

docker container prune # 删除所有停止的容器
docker image prune -a # 删除没有容器使用的镜像
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


## docker login fail ubuntu18.04： error saving credentials: error storing credentials - err: exit status 1, out: Cannot autolaunch D-Bus without X11 $DISPLA

sudo apt install gnupg2 pass



## 部署docker registry

```bash
sudo` `docker run \
-e SETTINGS_FLAVOR=s3 \
-e AWS_BUCKET=acme-docker \
-e STORAGE_PATH=``/registry` `\
-e AWS_KEY=AWS_KEY \ 
-e AWS_SECRET=AWS_SECRET \
-e SEARCH_BACKEND=sqlalchemy \
-p 5000:5000 \
registry

sudo docker run \
-e SEARCH_BACKEND=sqlalchemy \
-p 5000:5000 \
registry
```



## docker registry的一些功能

https://stackoverflow.com/questions/23733678/how-to-search-images-from-private-1-0-registry-in-docker

【坑】必须要开启SEARCH_BACKEND才能进行api调用，否则404

```bash
curl -X GET http://localhost:5666/v1/search?q=acl-wechat-auth-service
curl -X GET http://localhost:5666/v1/search
curl -X GET http://localhost:5666/v2/_catalog
curl -X GET http://localhost:5666/v2/<name>/tags/list
curl -X GET http://localhost:5666/v2/acl-wechat-auth-service/tags/list

docker search [my.registry.host]:[port]/library
docker search localhost:5666/config.example.com

curl -iv https://localhost:5666/v1/search?q=base
curl -iv http://localhost:5666/v1/search?q=base
```



## docker registry web-UI

https://github.com/search?q=docker+registry+web+ui

https://github.com/atc-/docker-registry-web

```bash
docker run -p 8080:8080 -e REG1=http://registry_host.name:5000/v1/ atcol/docker-registry-ui

docker run -d -p 8123:8080 -e REG1=http://localhost:5666/v1/ atcol/docker-registry-ui
```



## 把运行中的容器保存为新镜像

```bash
docker commit jenkins registry.cn-hangzhou.aliyuncs.com/sherry/jenkins:2.153-1
docker commit 当前运行的容器名 新镜像名:版本号
```


## problem

> docker-credential-desktop not installed or not available in PATH

sed -i~ 's/"desktop"/"osxkeychain"/g' ~/.docker/config.json

https://github.com/docker/for-mac/issues/3785
