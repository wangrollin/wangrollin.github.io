k8s gitbook

https://feisky.gitbooks.io/kubernetes/content/





安装Helm

 

$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh

$ chmod 700 get_helm.sh

$ ./get_helm.sh

 

 

Helm手写Chart

 

https://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&mid=2247486154&idx=1&sn=becd5dd0fadfe0b6072f5dfdc6fdf786&chksm=eac52be3ddb2a2f555b8b1028db97aa3e92d0a4880b56f361e4b11cd252771147c44c08c8913&mpshare=1&scene=23&srcid=0809XT1uzvaUqkaWiouHAUv4%23rd



## tips

### CNCF 官方大使张磊：Kubernetes 是一个“数据库”  从数据的角度看k8s

https://my.oschina.net/u/3874284/blog/4286585



## kubectl 实用命令

```bash
# 可以这样临时切换kubectl的指向
export KUBECONFIG=/Users/wangrollin/code_base/wb2c-helm/k8s/bigdata/config


kubectl scale --replicas=0 -n wechat deployment/acl-content-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-configuration-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-eureka-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-service-gateway && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-api-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-auth-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-countly-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-miniapp-service && \
kubectl scale --replicas=0 -n wechat deployment/acl-wechat-miniapp-session-service

```



## k8s yaml

```yaml
env:
- name: MY_POD_NAME
  valueFrom:
    fieldRef:
      fieldPath: metadata.name
- name: MY_POD_NAMESPACE
  valueFrom:
    fieldRef:
      fieldPath: metadata.namespace
- name: MY_POD_IP
  valueFrom:
    fieldRef:
      fieldPath: status.podIP
- name: REFERENCE_EXAMPLE
  value: "$(MY_NODE_NAME)"
```



## Orphaned pod found - but volume paths are still present on disk

```bash
docker logs -f --tail 500 kubelet

sudo -i
cd /var/lib/kubelet/pods/
rm -rf xxx
```
