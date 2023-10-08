
## context

```bash
# 可以这样临时切换kubectl的指向
export KUBECONFIG=/Users/wangrollin/code_base/wb2c-helm/k8s/bigdata/config
```


## 概念

### 亲和性

污点 taint

容忍度 toleration

## 配置

### 从私有仓库拉取镜像

https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/pull-image-private-registry/



## 暴露服务的方式

### nodeport

### loadbalance

nodeport上 包了一层负载均衡

### ingress

ingress = 微服务网关， 本质：七层反向代理，微服务集中出入口

全部通过一个port来访问，可以设置 cert
相当于nodeport全部归为80和443，不开放其他端口
nodeport svc 80 443 -> ingress controller -> ingress(nginx pod) -> svc -> deploy pod

组件
- ingress controller -- 解决 nginx 如何动态处理配置的问题
- ingress -- 相当于 yaml 化的 nginx conf

Ingress Controoler 通过与 Kubernetes API 交互，动态的去感知集群中 Ingress 规则变化，然后读取他，按照他自己模板生成一段 Nginx 配置，再写到 Nginx Pod 里，最后 reload 一下

## yaml 写法

### 多条命令

```yaml
          command:
            - /bin/bash
          args:
            - -c
            - |
              sleep 1000;
              sleep 1000;
              sleep 1000;
```

### pod run as 宿主机上的某个用户

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  initContainers:
  - name: init
    image: <image_name>
    command: ["sh", "-c", "echo \"user1:x:$(id -u user1):$(id -g user1):User 1:/home/user1:/bin/bash\" >> /etc/passwd"]
    volumeMounts:
    - name: passwd-file
      mountPath: /etc/passwd
  containers:
  - name: my-container
    image: <image_name>
    command: ["<command>"]
    volumeMounts:
    - name: passwd-file
      mountPath: /etc/passwd
  volumes:
  - name: passwd-file
    hostPath:
      path: /etc/passwd
      type: File
```


## 命令大全

### 查看版本

kubectl version
kubectl version --short

### 查看集群信息

kubectl cluster-info

### 创建用户

kubectl create serviceaccount spark

### 快速创建 deploy service yaml

kubectl create deployment k8s-demo-app --image localhost:5000/apps/demo -o yaml --dry-run=client > deployment.yaml
kubectl create service clusterip k8s-demo-app --tcp 80:8080 -o yaml --dry-run=client > service.yaml
kubectl create configmap log-level --from-literal=LOGGING_LEVEL_ORG_SPRINGFRAMEWORK=DEBUG
kubectl create configmap k8s-demo-app-config --from-file ./path/to/application.yaml

### k8s dns 修改

kubectl get cm -A | grep dns

kubectl describe cm coredns -nkube-system
kubectl edit cm coredns -nkube-system

在hosts部分添加
ip domain

重启pod才能生效

### 根据ip查看pod

kubectl get pods --field-selector=status.podIP=ip
kubectl get po -A -o wide | grep ip

### proxy

kubectl proxy

### port forward

kubectl port-forward
kubectl port-forward service/k8s-demo-app 8080:80

### expose 命令

kubectl expose deploy app-name --port=80 --target-port=80 --type=NodePort
kubectl expose deploy app-name --port=80 --target-port=80 --type=NodePort -o yaml --dry-run > svc.yaml

nodeport -- node
port -- svc
target-port -- pod

### 查看日志

kubectl logs [pod-name] -f

### 看资源信息 get describe

```bash
# 可以拿到 container runtime
kubectl get node -o wide

kubectl get deploy
kubectl get po -A
kubectl get svc
kubectl get ingress
kubectl get crds
kubectl get componentdefinitions -A
kubectl get rolebinding
kubectl get ns

kubectl describe node node-ip
kubectl describe po po-name
```

### 重启 deploy

```bash
kubectl patch deployment your_deployment -p "{\"spec\": {\"template\": {\"metadata\": { \"labels\": {  \"redeploy\": \"$(date +%s)\"}}}}}"

kubectl patch service k8s-demo-app -p '{"spec": {"type": "LoadBalancer", "externalIPs":["172.18.0.2"]}}'

```

### 更新 deploy 镜像

```bash
kubectl set image deployment/<<deployment-name>> -n=<<namespace>> <<container_name>>=<<your_dockerhub_username>>/<<image_name you want to set now>>:<<tag_of_the_image_you_want>>

kubectl set image deployment/nginx-deployment nginx=nginx:1.16.1
kubectl set image deploy my-backend -nns my-backend-spec-container-name=image:version

```

### 更新 k8s 资源

kubectl edit configmap <name of the configmap>
kubectl edit deploy deploy-name

### 删除 k8s 资源

kubectl delete po po-name -n ns

### 更新 replicas

kubectl scale --replicas=0 deployment/deploy-name -n ns

### 滚动重启 pod


### rollout

kubectl rollout status sts minio -n minio


### 进入 pod 执行命令

kubectl exec -it podname -n ns -- bash

### 不进入 pod 执行命令

kubectl exec -it podname -n ns -- bash -c "ps -ef"

### 查看 cpu mem

kubectl top po -pod-name
kubectl top po -A
kubectl top node node-ip

### 允许/禁止调度到某个节点

禁止调度
kubectl cordon NODE_NAME
可以调度
kubectl uncordon NODE_NAME

### k8s context

kubectl config current-context
kubectl config view


## 添加rancher k8s到本地的k8s context里

```bash
# 不好用啊，哭了

kubectl config set-cluster [dev-k8s] --server=[https://ip:port] --certificate-authority-data=[xxxxxxx]

kubectl config set-credentials [dev-k8s] --token=[xxxxxxx]

kubectl config set-context dev-k8s --cluster=[dev-k8s] --user=[dev-k8s]


kubectl config set-cluster ttttt --server=https://ip:port --certificate-authority-data=ttttt

kubectl config set-credentials ttttt --token=xxxxxxx

kubectl config set-context dev-k8s --cluster=ttttt --user=ttttt
```