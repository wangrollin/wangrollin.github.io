

## 让deployment重启

```bash
kubectl patch deployment your_deployment -p "{\"spec\": {\"template\": {\"metadata\": { \"labels\": {  \"redeploy\": \"$(date +%s)\"}}}}}"
```



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