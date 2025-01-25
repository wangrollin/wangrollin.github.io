
## CNCF distribution

原来是 docker registry

本质上是一个基于http的文件服务器

基于 OCI distribution specification


## 网页

- [github](https://github.com/distribution/distribution/)
- [doc](https://distribution.github.io/distribution/)


## docker run

```bash

docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v /opt/datainfra/registry/data:/var/lib/registry \
  registry:2


docker pull ubuntu
docker image tag ubuntu localhost:5000/myfirstimage
docker push localhost:5000/myfirstimage
docker pull localhost:5000/myfirstimage
```


## docker 运行, old

- [官方文档](https://docs.docker.com/registry/)

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


## tips

## http 报错

如果上述方法还是不能解决，还可以通过以下办法解决：

1.vim  /etc/docker/daemon.json    增加一个daemon.json文件

{ "insecure-registries":["server host:5000"] }
保存退出

