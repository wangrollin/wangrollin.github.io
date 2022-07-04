
brew install helm
brew install helmfile

### 安装Helm

```bash
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh

$ chmod 700 get_helm.sh

$ ./get_helm.sh
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