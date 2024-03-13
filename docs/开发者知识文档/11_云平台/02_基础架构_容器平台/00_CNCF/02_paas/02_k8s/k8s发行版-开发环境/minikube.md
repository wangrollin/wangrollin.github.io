# minikube

## 网页

- [官网](https://minikube.sigs.k8s.io/docs/)
- [github](https://github.com/kubernetes/minikube)

## 安装命令

brew install minikube

## 常用命令

### 国内启动命令

minikube start

minikube start --kubernetes-version=1.17.2 --vm-driver=virtualbox --image-repository registry.aliyuncs.com/google_containers --image-mirror-country cn --iso-url=https://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/iso/minikube-v1.7.0.iso --registry-mirror=https://qud0jcbl.mirror.aliyuncs.com

### 升级 k8s version

minikube start --kubernetes-version=v1.26.3

### 停止 k8s

minikube stop

### 删除 k8s 数据

minikube delete

### 部署 busybox

minikube kubectl -- create deployment busybox-1 --image=busybox

### minikube kubectl 使用

minikube kubectl -- xxx
minikube kubectl -- version

### image

minikube image ls
minikube image ls --format table
minikube image load local-image

### docker cli -> docker daemon in minikube

minikube docker-env
eval $(minikube docker-env)

## tips

电脑休眠后minikube回卡住，直接重启 docker desktop
