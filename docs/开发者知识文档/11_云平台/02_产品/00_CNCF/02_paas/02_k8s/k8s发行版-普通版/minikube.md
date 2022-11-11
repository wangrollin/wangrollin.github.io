# minikube

## 网页

- [官网](https://minikube.sigs.k8s.io/docs/)
- [github](https://github.com/kubernetes/minikube)

## 常用命令

```bash
# 安装命令
brew install minikube

# 国内启动命令
minikube start --kubernetes-version=1.17.2 --vm-driver=virtualbox --image-repository registry.aliyuncs.com/google_containers --image-mirror-country cn --iso-url=https://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/iso/minikube-v1.7.0.iso --registry-mirror=https://qud0jcbl.mirror.aliyuncs.com

# 部署busybox
minikube kubectl -- create deployment busybox-1 --image=busybox
```

## tips

电脑休眠后minikube回卡住，直接重启 docker desktop
