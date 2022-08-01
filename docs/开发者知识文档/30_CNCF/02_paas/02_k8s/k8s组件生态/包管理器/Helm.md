
brew install helm
brew install helmfile


## 网页

- [官网](https://helm.sh/)
- [官网 doc](https://helm.sh/docs/)
- [github](https://github.com/helm/helm)


## helm 源

### bitnami.com

```bash
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm search repo bitnami
$ helm install my-release bitnami/<chart>
```

## 常用命令

```bash
# 安装 Helm
brew install helm
or
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh

# 更新/查询 charts
helm repo update
helm show chart bitnami/mysql
helm show all bitnami/mysql

# 安装/卸载 charts
helm list
helm ls
helm install bitnami/mysql --generate-name
helm status mysql-1612624192
helm uninstall mysql-1612624192
helm rollback

# 帮助信息
helm help
helm get -h
```

## Helm手写Chart

https://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&mid=2247486154&idx=1&sn=becd5dd0fadfe0b6072f5dfdc6fdf786&chksm=eac52be3ddb2a2f555b8b1028db97aa3e92d0a4880b56f361e4b11cd252771147c44c08c8913&mpshare=1&scene=23&srcid=0809XT1uzvaUqkaWiouHAUv4%23rd



### helm 命令

```bash

helm version

helm package .

helm install [name] [chat-zip] [flag]
helm install vault-consul 

helm list
helm uninstall [name]
```



## helm docker 镜像

```bash
dtzar/helm-kubectl
lworf/xxx
```



## 防止某些资源在 helm uninstall的时候删掉

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  annotations:
    "helm.sh/resource-policy": keep
```