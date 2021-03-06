# docker

Docker 使用过程中有许多常用的命令，完整列表可以查看docker help

 

### 阿里云docker镜像服务

```bash
docker build -t registry.cn-hangzhou.aliyuncs.com/wangrollin-web/web-front:0.0.3 .

sudo docker login --username=username registry.cn-hangzhou.aliyuncs.com

docker push registry.cn-hangzhou.aliyuncs.com/wangrollin-web/web-front:0.0.3

docker run -d -p 80:80 registry.cn-hangzhou.aliyuncs.com/wangrollin-web/web-front:0.0.3
```







\# 镜像操作

```bash
docker build -t runoob/ubuntu:v1 . 
docker build -t config.example.com/wechat-analytics-flink:0.0.1-SNAPSHOT .

docker run config.example.com/wechat-analytics-flink:0.0.1-SNAPSHOT

docker push config.example.com/wechat-analytics-flink:0.0.1-SNAPSHOT
```

docker images # 查看镜像

docker rmi <镜像ID或名称> # 删除镜像

docker search <关键词> # 在镜像仓库中搜索

docker pull <镜像> # 从镜像仓库拉取镜像

docker save -o image.tar <镜像ID或名称> # 将镜像保存到文件

docker load -i image.tar # 从文件载入镜像

 docker container prune # 删除所有停止的容器



\# 容器操作

docker ps # 查看运行的容器

docker ps -a # 查看所有的容器

docker restart <容器ID或名称> # 重启容器

docker stop <容器ID或名称> # 停止容器

docker start <容器ID或名称> # 启动停止的容器

docker rm <容器ID或名称> # 删除容器，必须先停止，使用 -f 参数强制删除

docker logs <容器ID或名称> # 查看容器的日志

docker exec <容器ID或名称> <命令> # 在容器中执行命令

docker exec -ti <容器ID或名称> bash # 典型的用法是登陆容器的 bash

docker top <容器ID或名称> # 查看容器的进程

docker inspect <容器ID或名称> # 查看容器的底层信息，如 IP 等



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
