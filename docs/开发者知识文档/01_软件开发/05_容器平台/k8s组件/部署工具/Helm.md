

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