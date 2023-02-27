

## 命令大全

### 看资源信息 get describe

kubectl get node
kubectl get deploy
kubectl get po -A
kubectl get svc
kubectl get ingress

kubectl describe node node-ip
kubectl describe po po-name

### 重启 deploy

```bash
kubectl patch deployment your_deployment -p "{\"spec\": {\"template\": {\"metadata\": { \"labels\": {  \"redeploy\": \"$(date +%s)\"}}}}}"
```

### 更新 deploy 镜像

```bash
kubectl set image deployment/<<deployment-name>> -n=<<namespace>> <<container_name>>=<<your_dockerhub_username>>/<<image_name you want to set now>>:<<tag_of_the_image_you_want>>

kubectl set image deployment/nginx-deployment nginx=nginx:1.16.1
```

### 更新 k8s 资源

kubectl edit configmap <name of the configmap>
kubectl edit deploy deploy-name

### 删除 k8s 资源

kubectl delete po po-name -n ns

### 更新 replicas

kubectl scale --replicas=0 deployment/deploy-name -n ns

### 进入 pod 执行命令

kubectl exec -it pod-name bash -n ns

### 查看 cpu mem

kubectl top po -pod-name
kubectl top node node-ip

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