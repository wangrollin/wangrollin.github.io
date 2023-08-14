
## 网页

- [k8s中文社区](https://www.kubernetes.org.cn/)
- [4 种常用的 Kubernetes 容器(标准容器，Sidecar 容器，Init 容器，Ephemeral 容器)](https://mp.weixin.qq.com/s/S7wB-waJyP8p_2Vp-4y0yg)
- [深入浅出 Kubernetes 项目网关与应用路由](https://mp.weixin.qq.com/s/G-IwqLlujRnyQReDNi6uOA)
- [k8s gitbook](https://feisky.gitbooks.io/kubernetes/content/)


## k8s yaml

### 常用变量

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

### resource 字段

- [Kubernetes 资源分配之 Request 和 Limit 解析](https://cloud.tencent.com/developer/article/1004976)


## tips

### CNCF 官方大使张磊：Kubernetes 是一个“数据库”  从数据的角度看k8s

https://my.oschina.net/u/3874284/blog/4286585


### Orphaned pod found - but volume paths are still present on disk

```bash
docker logs -f --tail 500 kubelet

sudo -i
cd /var/lib/kubelet/pods/
rm -rf xxx
```
